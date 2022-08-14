import { IConfigManager, IConfigRepository } from '@infra/config/ports';
import { inject, singleton } from 'tsyringe';

@singleton()
export class AppConfigManager implements IConfigManager {
  constructor(
    @inject('IConfigRepository')
    private readonly configRepository: IConfigRepository
  ) {}

  async getSecret(key: string): Promise<string> {
    return this.configRepository.getSecret(key);
  }
}
