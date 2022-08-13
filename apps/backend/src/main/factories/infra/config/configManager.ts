import { DotenvConfigRepository } from '@external/config/dotenv/repositories/config';
import { AppConfigManager } from '@infra/config/configManager';
import { IConfigManager } from '@infra/config/ports';

export const buildConfigManager = (): IConfigManager => {
  const configRepository = new DotenvConfigRepository();
  return new AppConfigManager(configRepository);
};
