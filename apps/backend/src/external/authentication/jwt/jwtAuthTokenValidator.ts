import jwt from 'jsonwebtoken';
import {
  IAuthTokenValidator,
  IAuthTokenValidatorInput,
} from '@infra/authentication/ports';

export class JwtAuthTokenValidator implements IAuthTokenValidator {
  async validate(input: IAuthTokenValidatorInput): Promise<boolean> {
    return new Promise((resolve) => {
      jwt.verify(input.authToken, input.secret, (err) => resolve(!err));
    });
  }
}
