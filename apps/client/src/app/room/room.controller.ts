import { rpc } from '@deepkit/rpc';

import { RoomControllerInterface } from '@apex/api/client';

@rpc.controller(RoomControllerInterface)
export class RoomController implements RoomControllerInterface {}
