import { Injectable } from '@angular/core';
import { RpcClient } from '@deepkit/rpc';

import { MessengerControllerInterface } from '@zeus/api/server';

@Injectable()
export class MessengerService {
  private readonly controller = this.client.controller<MessengerControllerInterface>(MessengerControllerInterface);

  constructor(private readonly client: RpcClient) {}
}
