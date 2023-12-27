import { entity } from '@deepkit/type';

import { RoomChat } from '@apex/api/shared';

@entity.name('@event/room-chat')
export class RoomChatEvent extends RoomChat {}

@entity.name('@event/room-furni-animate-event')
export class RoomFurniAnimateEvent {}

export type RoomEvent = RoomChatEvent | RoomFurniAnimateEvent;

export type GameEvent = {};

export type MessengerEvent = {};
