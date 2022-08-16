import { singleton } from 'tsyringe';
import bcrypt from 'bcrypt';

import { IHashComparer } from '@infra/cryptography/ports';

@singleton()
export class BcryptPasswordHashComparer implements IHashComparer {
  async compare(plain: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plain, hashed);
  }
}
