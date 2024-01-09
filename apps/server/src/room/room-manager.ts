import { cast } from '@deepkit/type';

import { Room, RoomChatMessage, User } from '@apex/api/shared';
import { CreateRoomArgs } from '@apex/api/server';
import {
  RoomEvent,
  RoomChatMessageEvent,
  RoomUserJoinedEvent,
  RoomUserLeftEvent,
} from '@apex/api/client';

import { RoomRepository } from './room.repository';
import { GameClient } from '../game';

export class ActiveRoom {
  private readonly gameClients = new Set<GameClient>();

  constructor(readonly room: Room) {}

  async sendEvent(event: RoomEvent): Promise<void> {
    await Promise.all(
      [...this.gameClients].map(async client =>
        await client.controllers.room.handleEvent(event),
      ),
    );
  }

  queueEvent(event: RoomEvent): void {
    queueMicrotask(async () => await this.sendEvent(event));
  }

  async sendChatMessage(
    sender: RoomChatMessage['sender'],
    content: RoomChatMessage['content'],
  ): Promise<RoomChatMessage> {
    const chatMessage = cast<RoomChatMessage>({ sender, content });
    this.room.chatMessages.next(chatMessage);
    const chatMessageEvent = cast<RoomChatMessageEvent>(chatMessage);
    void this.sendEvent(chatMessageEvent);
    return chatMessage;
  }

  async join(gameClient: GameClient): Promise<void> {
    this.gameClients.add(gameClient);
    gameClient.session.user.setActiveRoom(this.room);
    await this.sendEvent(new RoomUserJoinedEvent(gameClient.session.user));
  }

  leave(gameClient: GameClient): void {
    this.gameClients.delete(gameClient);
    gameClient.session.user.setActiveRoom(undefined);
    this.queueEvent(new RoomUserLeftEvent(gameClient.session.user));
  }
}

export class RoomManager {
  private readonly activeRooms = new Map<Room['id'], ActiveRoom>();

  constructor(private readonly repo: RoomRepository) {}

  private async getOrCreateActiveRoom(id: Room['id']): Promise<ActiveRoom> {
    if (!this.activeRooms.has(id)) {
      const room = await this.repo.findOne({ id });
      const activeRoom = new ActiveRoom(room);
      this.activeRooms.set(id, activeRoom);
    }
    return this.activeRooms.get(id)!;
  }

  removeActiveRoom(id: Room['id']) {
    this.activeRooms.delete(id);
  }

  getActiveRoom(id: Room['id']): ActiveRoom {
    const room = this.activeRooms.get(id);
    if (!room) {
      throw new Error('No active room');
    }
    return room;
  }

  async join(id: Room['id'], gameClient: GameClient): Promise<Room> {
    const activeRoom = await this.getOrCreateActiveRoom(id);
    await activeRoom.join(gameClient);
    return activeRoom.room;
  }

  async leave(id: Room['id'], gameClient: GameClient): Promise<Room> {
    const activeRoom = this.getActiveRoom(id);
    activeRoom.leave(gameClient);
    return activeRoom.room;
  }

  async create(owner: User, data: CreateRoomArgs): Promise<Room> {
    return await this.repo.create({
      ...data,
      owner,
    });
  }

  async sendChatMessage(
    id: Room['id'],
    sender: RoomChatMessage['sender'],
    content: RoomChatMessage['content'],
  ): Promise<RoomChatMessage> {
    return await this.getActiveRoom(id).sendChatMessage(sender, content);
  }

  async delete(id: Room['id'], user: User): Promise<Room> {
    const room = await this.repo.findOne(id);
    if (room.owner.id !== user.id) {
      throw new Error('User is not owner of the room');
    }

    this.removeActiveRoom(id);

    await this.repo.deleteOne({ id });

    return room;
  }

  async get(id: Room['id']): Promise<Room> {
    return (await this.getOrCreateActiveRoom(id)).room;
  }
}
