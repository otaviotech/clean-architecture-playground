import { IHashPasswordService } from '@application/ports/services';
import { BcryptHasher } from '@external/cryptography';
import { HashPasswordService } from '@infra/cryptography';

export const buildHashPasswordService = (): IHashPasswordService => {
  const adapter = new BcryptHasher();
  return new HashPasswordService(adapter);
};
