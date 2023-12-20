import { rpc } from '@deepkit/rpc';

import { MessengerControllerInterface } from '@zeus/api/client';

@rpc.controller(MessengerControllerInterface)
export class MessengerController implements MessengerControllerInterface {}
