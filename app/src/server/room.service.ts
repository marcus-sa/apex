import { Room, User } from '../entities';

export class RoomService {
  readonly activeRooms = new Map<Room['id'], {
    users: readonly User['id'][];
  }>();

  constructor(private readonly ) {}
}
