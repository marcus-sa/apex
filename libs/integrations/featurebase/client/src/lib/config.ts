export class FeaturebaseChangelogConfig {
  readonly fullscreenPopup?: boolean;
  readonly usersName?: string;
}

export class FeaturebasePortalConfig {
  readonly fullScreen: boolean;
  readonly initialPage:
    | 'MainView'
    | 'RoadmapView'
    | 'CreatePost'
    | 'PostsView'
    | 'ChangelogView';
}

export class FeaturebaseFeedbackConfig {
  readonly fullscreenPopup?: boolean;
  readonly email?: string;
}

export class FeaturebaseConfig {
  readonly widget: 'changelog' | 'portal' | 'feedback';
  readonly organization: string;
  readonly theme: 'dark' | 'light' = 'dark';
  readonly placement?: 'right' | 'left' | 'top' | 'bottom';
  readonly changelog?: FeaturebaseChangelogConfig;
  readonly portal?: FeaturebasePortalConfig;
  readonly feedback?: FeaturebaseFeedbackConfig;
}
