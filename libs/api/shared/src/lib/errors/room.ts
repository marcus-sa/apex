import { entity } from '@deepkit/type';

@entity.name('@error/room-invalid-password')
export class InvalidRoomPasswordError extends Error {}
