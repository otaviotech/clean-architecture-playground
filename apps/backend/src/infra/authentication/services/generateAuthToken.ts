import {
  GenerateAuthTokenServiceInput,
  IGenerateAuthTokenService,
} from '@application/ports/services/authentication';

import { IAuthTokenGenerator } from '@infra/authentication/ports';
import { IConfigManager } from '@infra/config/ports';

export class GenerateAuthTokenService implements IGenerateAuthTokenService {
  constructor(
    private readonly authTokenGenerator: IAuthTokenGenerator,
    private readonly configManager: IConfigManager
  ) {}

  async execute(input: GenerateAuthTokenServiceInput): Promise<string> {
    const { payload } = input;
    const secret = await this.configManager.getSecret('AUTH_TOKEN_SECRET');

    return this.authTokenGenerator.generate({ payload, secret });
  }
}
