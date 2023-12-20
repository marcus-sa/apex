import {
  AutoIncrement,
  cast,
  entity,
  integer,
  JSONEntity,
  Positive,
  PrimaryKey,
} from '@deepkit/type';

export enum ItemType {
  ROOM,
  WALL,
}

export enum ItemInteractionType {
  DEFAULT,
  GATE,
  TELEPORT,
}

@entity.name('item')
export class BaseItem {
  readonly id: integer & PrimaryKey & AutoIncrement;
  readonly baseId: integer & Positive;
  readonly name: string;
  readonly states: integer;
  readonly stackable: boolean;
  readonly walkable: boolean;
  readonly seatable: boolean;
  readonly inventoryStackable: boolean;
  readonly directions: readonly integer[];
  readonly type: ItemType;
  readonly interactionType: ItemInteractionType = ItemInteractionType.DEFAULT;

  static create(data: JSONEntity<BaseItem>): BaseItem {
    return cast<BaseItem>(data);
  }
}
