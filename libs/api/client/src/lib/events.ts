import { entity, ReflectionKind, TypeClass, typeOf, TypeUnion } from '@deepkit/type';
import { ClassType } from '@deepkit/core';

import { RoomChatMessage, User } from '@apex/api/shared';

@entity.name('@event/room-chat-message')
export class RoomChatMessageEvent extends RoomChatMessage {}

@entity.name('@event/room-user-left')
export class RoomUserLeftEvent {
  constructor(readonly user: User) {}
}

@entity.name('@event/room-user-joined')
export class RoomUserJoinedEvent {
  constructor(readonly user: User) {}
}

@entity.name('@event/room-user-kicked')
export class RoomUserKickedEvent {
  readonly user: User;
  readonly reason?: string;
}

@entity.name('@event/room-furni-animate-event')
export class RoomFurniAnimateEvent {}

export type RoomEvent =
  | RoomChatMessageEvent
  | RoomUserKickedEvent
  | RoomFurniAnimateEvent
  | RoomUserJoinedEvent
  | RoomUserLeftEvent;

export const ROOM_EVENTS: readonly ClassType[] = (
  typeOf<RoomEvent>() as TypeUnion
).types
  .filter((type): type is TypeClass => type.kind === ReflectionKind.class)
  .map(type => type.classType);

export type GameEvent = {};

export type MessengerEvent = {};
