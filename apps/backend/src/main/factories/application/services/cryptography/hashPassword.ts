import { IHashPasswordService } from '@application/ports/services';
import { BcryptHasher } from '@external/cryptography/bcryptHasher';
import { Hasher } from '@infra/cryptography/hasher';

export const buildHashPasswordService = (): IHashPasswordService => {
  const adapter = new BcryptHasher();
  return new Hasher(adapter);
};
