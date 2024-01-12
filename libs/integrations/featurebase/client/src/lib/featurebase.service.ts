import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { asyncOperation } from '@deepkit/core';

import {
  FeaturebaseChangelogConfig,
  FeaturebaseConfig,
  FeaturebaseFeedbackConfig,
  FeaturebasePortalConfig,
} from './config';

declare global {
  interface Window {
    Featurebase(
      widget: 'initialize_portal_widget',
      options: FeaturebasePortalConfig,
    ): void;
    Featurebase(
      widget: 'initialize_feedback_widget',
      options: FeaturebaseFeedbackConfig,
    ): void;
    Featurebase(
      widget: 'initialize_changelog_widget',
      options: FeaturebaseChangelogConfig,
    ): void;
  }
}

@Injectable()
export class FeaturebaseService {
  constructor(
    private readonly config: FeaturebaseConfig,
    @Inject(DOCUMENT) private readonly document: Document,
  ) {}
  async initialize(): Promise<void> {
    await asyncOperation((resolve, reject) => {
      const script = this.document.createElement('script');
      script.id = 'featurebase-sdk';
      script.src = 'https://do.featurebase.app/js/sdk.js';
      script.async = true;

      script.onload = resolve;
      script.onerror = reject;

      this.document.body.appendChild(script);
    });

    if (this.config.widget === 'changelog') {
      if (!this.config.changelog) {
        throw new Error('Missing changelog config');
      }
      window.Featurebase('initialize_changelog_widget', this.config.changelog);
    } else if (this.config.widget === 'feedback') {
      if (!this.config.feedback) {
        throw new Error('Missing feedback config');
      }
      window.Featurebase('initialize_feedback_widget', this.config.feedback);
    } else if (this.config.widget === 'portal') {
      if (!this.config.portal) {
        throw new Error('Missing portal config');
      }
      window.Featurebase('initialize_portal_widget', this.config.portal);
    }
  }
}
