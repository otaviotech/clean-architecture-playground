import { IConfigManager, IConfigRepository } from '@infra/config/ports';

export class AppConfigManager implements IConfigManager {
  constructor(private readonly configRepository: IConfigRepository) {}

  async getSecret(key: string): Promise<string> {
    return this.configRepository.getSecret(key);
  }
}
