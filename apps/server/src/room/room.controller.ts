import { rpc } from '@deepkit/rpc';

import { RoomControllerInterface, CreateRoomArgs } from '@apex/api/server';
import { Room, User } from '@apex/api/shared';

import { RoomManager } from './room-manager';
import { GameClient } from '../game';

@rpc.controller(RoomControllerInterface)
export class RoomController implements RoomControllerInterface {
  constructor(
    private readonly room: RoomManager,
    private readonly user: User,
    private readonly gameClient: GameClient,
  ) {}

  @rpc.action()
  async get(id: Room['id']): Promise<Room> {
    return await this.room.get(id);
  }

  @rpc.action()
  async join(
    id: Room['id'],
    options?: { readonly password?: string },
  ): Promise<Room> {
    return await this.room.join(id, this.gameClient);
  }

  @rpc.action()
  async sendChatMessage(content: string) {
    await this.room.sendChatMessage(
      this.user.getActiveRoom().id,
      this.user,
      content,
    );
  }

  @rpc.action()
  async leave(): Promise<void> {
    await this.room.leave(this.user.getActiveRoom().id, this.gameClient);
  }

  @rpc.action()
  async create(data: CreateRoomArgs): Promise<Room> {
    return await this.room.create(this.user, data);
  }

  @rpc.action()
  async delete(id: Room['id']): Promise<Room> {
    return await this.room.delete(id, this.user);
  }
}
