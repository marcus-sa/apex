import { bootstrapApplication } from '@angular/platform-browser';

import { getAppConfig } from './app/config';
import { AppComponent } from './app/app.component';

void (async () => {
  const config = await getAppConfig();
  await bootstrapApplication(AppComponent, config);
})();

