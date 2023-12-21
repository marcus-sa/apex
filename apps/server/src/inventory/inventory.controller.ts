import { rpc } from '@deepkit/rpc';

import { InventoryControllerInterface } from '@apex/api/server';

@rpc.controller(InventoryControllerInterface)
export class InventoryController implements InventoryControllerInterface {}
