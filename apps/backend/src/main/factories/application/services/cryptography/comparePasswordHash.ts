import { IComparePasswordHashService } from '@application/ports/services';
import { PasswordHashComparer } from '@infra/cryptography/hashComparer';
import { BcryptPasswordHashComparer } from '@external/cryptography';

export const buildComparePasswordHashService =
  (): IComparePasswordHashService => {
    return new PasswordHashComparer(new BcryptPasswordHashComparer());
  };
