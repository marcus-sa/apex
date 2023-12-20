import { rpc } from '@deepkit/rpc';

import { MessengerControllerInterface } from '@zeus/api/server';

@rpc.controller(MessengerControllerInterface)
export class MessengerController implements MessengerControllerInterface {}
