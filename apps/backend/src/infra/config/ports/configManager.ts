type AppConfigMap = 'AUTH_TOKEN_SECRET';

export interface IConfigManager {
  getSecret(key: AppConfigMap): Promise<string>;
}
