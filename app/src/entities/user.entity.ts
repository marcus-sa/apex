import { BackReference, entity, uuid, UUID } from '@deepkit/type';

import { Room } from './room.entity';

@entity.name('user')
export class User {
  readonly id: UUID = uuid();
  readonly rooms: readonly Room[] & BackReference;
}
