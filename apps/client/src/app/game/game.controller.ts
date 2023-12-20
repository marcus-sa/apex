import { rpc } from '@deepkit/rpc';

import { GameControllerInterface } from '@zeus/api/client';

@rpc.controller(GameControllerInterface)
export class GameController implements GameControllerInterface {}
