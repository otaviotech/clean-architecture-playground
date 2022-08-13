import { IGenerateAuthTokenService } from '@application/ports/services';
import { JwtAuthTokenGenerator } from '@external/authentication/jwt';
import { GenerateAuthTokenService } from '@infra/authentication/services';
import { buildConfigManager } from '@main/factories/infra/config';

export const buildGenerateAuthTokenService = (): IGenerateAuthTokenService => {
  const adapter = new JwtAuthTokenGenerator();
  const configManager = buildConfigManager();
  return new GenerateAuthTokenService(adapter, configManager);
};
