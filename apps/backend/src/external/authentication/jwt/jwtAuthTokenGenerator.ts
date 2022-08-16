import { singleton } from 'tsyringe';
import jwt from 'jsonwebtoken';

import {
  IAuthTokenGenerator,
  IAuthTokenGeneratorInput,
} from '@infra/authentication/ports';

@singleton()
export class JwtAuthTokenGenerator implements IAuthTokenGenerator {
  async generate(input: IAuthTokenGeneratorInput): Promise<string> {
    return jwt.sign(input.payload, input.secret, { expiresIn: input.ttl });
  }
}
