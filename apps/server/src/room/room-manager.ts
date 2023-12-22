import { cast } from '@deepkit/type';

import { Room, RoomChat, User } from '@apex/api/shared';
import { CreateRoomArgs } from '@apex/api/server';

import { RoomRepository } from './room.repository';
import { GameManager, GameClient } from '../game';

export class RoomManager {
  private readonly activeRooms = new Map<Room['id'], Room>();

  constructor(
    private readonly repo: RoomRepository,
    private readonly game: GameManager,
  ) {}

  private async getOrCreateActiveRoom(id: Room['id']): Promise<Room> {
    if (!this.activeRooms.has(id)) {
      const room = await this.repo.findOne({ id });
      this.activeRooms.set(id, room);
    }
    return this.activeRooms.get(id)!;
  }

  removeActiveRoom(id: Room['id']) {
    this.activeRooms.delete(id);
  }

  getActiveRoom(id: Room['id']): Room {
    const room = this.activeRooms.get(id);
    if (!room) {
      throw new Error('No active room');
    }
    return room;
  }

  private getGameClientsForActiveRoom(room: Room): readonly GameClient[] {
    return [...this.game.clients].filter(client => client.user?.activeRoom?.id === room.id);
  }

  async join(id: Room['id'], user: User): Promise<Room> {
    const room = await this.getOrCreateActiveRoom(id);

    user.setActiveRoom(room);

    queueMicrotask(async () => {
      const gameClients = this.getGameClientsForActiveRoom(room);
      await Promise.all(
        gameClients.map(async client =>
          client.controllers.room.handleUserJoined(user),
        ),
      );
    });

    return room;
  }

  async leave(id: Room['id'], user: User): Promise<Room> {
    const room = this.getActiveRoom(id);

    user.setActiveRoom(undefined);

    queueMicrotask(async () => {
      const gameClients = this.getGameClientsForActiveRoom(room);
      await Promise.all(
        gameClients.map(async client =>
          client.controllers.room.handleUserLeft(user),
        ),
      );
    });

    return room;
  }

  async create(owner: User, data: CreateRoomArgs): Promise<Room> {
    return await this.repo.create({
      ...data,
      owner,
    });
  }

  async chat(
    id: Room['id'],
    { sender, content }: Pick<RoomChat, 'sender' | 'content'>,
  ): Promise<RoomChat> {
    const room = this.getActiveRoom(id);

    const chat = cast<RoomChat>({ room, sender, content });

    room.chats.next(chat);

    const gameClients = this.getGameClientsForActiveRoom(room);
    void Promise.all(
      gameClients.map(async client =>
        client.controllers.room.handleChatMessage(chat),
      ),
    );

    return chat;
  }

  async delete(id: Room['id'], user: User): Promise<Room> {
    const room = await this.repo.findOne(id);
    if (room.owner.id !== user.id) {
      throw new Error('User is not owner of the room');
    }

    const gameClients = this.getGameClientsForActiveRoom(room);
    void Promise.all(
      gameClients.map(async client =>
        client.controllers.room.kickMe('Room was deleted'),
      ),
    );

    this.removeActiveRoom(id);

    await this.repo.deleteOne({ id });

    return room;
  }
}
