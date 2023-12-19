import 'zone.js';
import { bootstrapApplication } from '@deepular/client';

import { AppComponent } from './app.component';
import { appConfig } from './app.config';
import { router } from './router';

void bootstrapApplication(AppComponent, router, appConfig);
