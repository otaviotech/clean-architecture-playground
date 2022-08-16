import { inject, singleton } from 'tsyringe';

import { IValidateAuthTokenService } from '@application/ports/services';

import { IAuthTokenValidator } from '@infra/authentication/ports';
import { IConfigManager } from '@infra/config/ports';

@singleton()
export class ValidateAuthTokenService implements IValidateAuthTokenService {
  constructor(
    @inject('IAuthTokenValidator')
    private readonly authTokenValidator: IAuthTokenValidator,
    @inject('IConfigManager')
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
