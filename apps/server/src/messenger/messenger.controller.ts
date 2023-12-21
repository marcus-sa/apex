import { rpc } from '@deepkit/rpc';

import { MessengerControllerInterface } from '@apex/api/server';

@rpc.controller(MessengerControllerInterface)
export class MessengerController implements MessengerControllerInterface {}
