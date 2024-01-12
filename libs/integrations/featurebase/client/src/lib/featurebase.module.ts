import { APP_INITIALIZER, NgModule } from '@angular/core';

import { FeaturebaseService } from './featurebase.service';

@NgModule({
  providers: [
    FeaturebaseService,
    {
      provide: APP_INITIALIZER,
      deps: [FeaturebaseService],
      useFactory: (featurebase: FeaturebaseService) => async () =>
        featurebase.initialize(),
      multi: true,
    },
  ],
})
export class FeaturebaseModule {}
