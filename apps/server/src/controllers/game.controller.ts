import { rpc } from '@deepkit/rpc';

import { GameControllerInterface } from '@zeus/api/server';

@rpc.controller(GameControllerInterface)
export class GameController implements GameControllerInterface {}
