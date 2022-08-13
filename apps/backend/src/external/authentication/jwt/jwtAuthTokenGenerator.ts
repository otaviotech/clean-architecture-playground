import jwt from 'jsonwebtoken';

import {
  IAuthTokenGenerator,
  IAuthTokenGeneratorInput,
} from '@infra/authentication/ports';

export class JwtAuthTokenGenerator implements IAuthTokenGenerator {
  async generate(input: IAuthTokenGeneratorInput): Promise<string> {
    return jwt.sign(input.payload, input.secret, { expiresIn: '1h' });
  }
}
