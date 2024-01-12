import { createModule } from '@deepkit/app';

import { FeaturebaseConfig } from './config';
import { FeaturebaseController } from './featurebase.controller';

export class FeaturebaseModule extends createModule({
  config: FeaturebaseConfig,
  controllers: [FeaturebaseController],
  forRoot: true,
}) {}
