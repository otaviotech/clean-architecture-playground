import {
  GenerateAuthTokenServiceInput,
  IGenerateAuthTokenService,
} from '@application/ports/services';

import { IAuthTokenGenerator } from '@infra/authentication/ports';
import { IConfigManager } from '@infra/config/ports';
import { inject, singleton } from 'tsyringe';

@singleton()
export class GenerateAuthTokenService implements IGenerateAuthTokenService {
  constructor(
    @inject('IAuthTokenGenerator')
    private readonly authTokenGenerator: IAuthTokenGenerator,
    @inject('IConfigManager') private readonly configManager: IConfigManager
  ) {}

  async execute(input: GenerateAuthTokenServiceInput): Promise<string> {
    const { payload } = input;
    const secret = await this.configManager.getSecret('AUTH_TOKEN_SECRET');
    const ttl = await this.configManager.getSecret('AUTH_TOKEN_TTL');

    return this.authTokenGenerator.generate({ payload, secret, ttl });
  }
}
