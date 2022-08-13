type AppConfigMap = 'AUTH_TOKEN_SECRET' | 'AUTH_TOKEN_TTL';

export interface IConfigManager {
  getSecret(key: AppConfigMap): Promise<string>;
}
