import { singleton } from 'tsyringe';
import jwt from 'jsonwebtoken';

import { IAuthTokenDecoder } from '@infra/authentication/ports';

@singleton()
export class JwtAuthTokenDecoder implements IAuthTokenDecoder {
  decode(
    token: string,
    secret: string
  ): Promise<{ [key: string]: string | number }> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded as { [key: string]: string | number });
        }
      });
    });
  }
}
