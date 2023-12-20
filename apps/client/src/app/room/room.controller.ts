import { rpc } from '@deepkit/rpc';

import { RoomControllerInterface } from '@zeus/api/client';

@rpc.controller(RoomControllerInterface)
export class RoomController implements RoomControllerInterface {}
