import { IValidateAuthTokenService } from '@application/ports/services';
import { JwtAuthTokenValidator } from '@external/authentication/jwt';
import { ValidateAuthTokenService } from '@infra/authentication/services';
import { buildConfigManager } from '@main/factories/infra/config';

export const buildValidateAuthTokenService = (): IValidateAuthTokenService => {
  const adapter = new JwtAuthTokenValidator();
  const configManager = buildConfigManager();
  return new ValidateAuthTokenService(adapter, configManager);
};
