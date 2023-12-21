import { rpc } from '@deepkit/rpc';

import { MessengerControllerInterface } from '@apex/api/client';

@rpc.controller(MessengerControllerInterface)
export class MessengerController implements MessengerControllerInterface {}
