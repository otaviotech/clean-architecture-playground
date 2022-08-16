import { singleton } from 'tsyringe';
import bcrypt from 'bcrypt';

import { IHasher } from '@infra/ports/hasher';

@singleton()
export class BcryptHasher implements IHasher {
  async hash(value: string): Promise<string> {
    return bcrypt.hash(value, 12);
  }
}
