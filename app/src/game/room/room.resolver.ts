import { Resolve, ServerController } from '@deepular/core';
import { ActivatedRouteSnapshot } from '@angular/router';

import type { RoomController } from './room.controller';
import { RoomState } from '../../entities';

export class RoomResolver implements Resolve<any> {
  constructor(private readonly room: ServerController<RoomController>) {}

  async resolve(route: ActivatedRouteSnapshot) {
    const data = await this.room.getInfo(route.params['id']);
    if (data.state === RoomState.LOCKED || data.state === RoomState.PASSWORD) {

    }
  }
}
