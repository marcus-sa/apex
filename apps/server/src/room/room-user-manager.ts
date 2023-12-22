import { Room, RoomUser } from '@apex/api/shared';

export class RoomUserManager {
  private readonly users = new Set<RoomUser>();

  constructor(private readonly room: Room) {}

  addUserToRoom() {}
}
