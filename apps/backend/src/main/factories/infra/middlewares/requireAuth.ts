import { RequireAuthenticationMiddleware } from '@infra/web/middlewares/authentication';
import { buildValidateAuthTokenService } from '@main/factories/application/services/authentication';

export const buildRequireAuthenticationMiddleware = () => {
  const service = buildValidateAuthTokenService();
  return new RequireAuthenticationMiddleware(service);
};
