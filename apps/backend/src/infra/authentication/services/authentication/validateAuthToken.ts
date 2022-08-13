import { IValidateAuthTokenService } from '@application/ports/services';
import { IAuthTokenValidator } from '@infra/authentication/ports';
import { IConfigManager } from '@infra/config/ports';

export class ValidateAuthTokenService implements IValidateAuthTokenService {
  constructor(
    private readonly authTokenValidator: IAuthTokenValidator,
    private readonly configManager: IConfigManager
  ) {}

  async execute(authToken: string): Promise<boolean> {
    if (!authToken) {
      return false;
    }

    const secret = await this.configManager.getSecret('AUTH_TOKEN_SECRET');
    return this.authTokenValidator.validate({ authToken, secret });
  }
}
