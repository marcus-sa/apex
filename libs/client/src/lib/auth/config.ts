export type OAuthProvider =
  | 'discord'
  | 'facebook'
  | 'google'
  | 'apple'
  | 'twitter';

export class AuthConfig {
  readonly providers: readonly OAuthProvider[] = [];

  hasProviders(): boolean {
    return !!this.providers.length;
  }
}
