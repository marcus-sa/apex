import { rpc } from '@deepkit/rpc';

import { GameControllerInterface } from '@apex/api/client';

@rpc.controller(GameControllerInterface)
export class GameController implements GameControllerInterface {}
