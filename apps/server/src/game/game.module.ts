import { createModule } from '@deepkit/app';

import { GameController } from './game.controller';
import { GameManager } from './game-manager';

export class GameModule extends createModule({
  controllers: [GameController],
  providers: [GameManager],
  exports: [GameManager],
  forRoot: true,
}) {}
