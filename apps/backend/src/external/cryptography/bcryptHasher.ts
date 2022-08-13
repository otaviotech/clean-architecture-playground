import bcrypt from 'bcrypt';
import { IHasher } from '@infra/ports/hasher';

export class BcryptHasher implements IHasher {
  async hash(value: string): Promise<string> {
    return bcrypt.hash(value, 12);
  }
}
