import { IConfigManager } from '@infra/config/ports';

export class ConfigManagerStub implements IConfigManager {
  async getSecret(
    key: 'AUTH_TOKEN_SECRET' | 'AUTH_TOKEN_TTL'
  ): Promise<string> {
    return 'SECRET';
  }
}
