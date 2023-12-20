import { rpc } from '@deepkit/rpc';

import { RoomControllerInterface } from '@zeus/api/server';

@rpc.controller(RoomControllerInterface)
export class RoomController implements RoomControllerInterface {}
