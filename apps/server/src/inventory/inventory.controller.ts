import { rpc } from '@deepkit/rpc';

import { InventoryControllerInterface } from '@zeus/api/server';

@rpc.controller(InventoryControllerInterface)
export class InventoryController implements InventoryControllerInterface {}
