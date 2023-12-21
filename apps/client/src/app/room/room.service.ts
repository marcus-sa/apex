import { Injectable } from '@angular/core';
import { RpcClient } from '@deepkit/rpc';

import { RoomControllerInterface } from '@apex/api/server';

@Injectable()
export class RoomService {
  private readonly controller = this.client.controller<RoomControllerInterface>(RoomControllerInterface);

  constructor(private readonly client: RpcClient) {}
}
