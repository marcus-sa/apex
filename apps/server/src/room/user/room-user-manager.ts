import { Room } from '../room';
import { RoomUser } from './room-user';

export class RoomUserManager {
  private readonly users = new Set<RoomUser>();

  constructor(private readonly room: Room) {
  }

  addUserToRoom() {

  }
}
