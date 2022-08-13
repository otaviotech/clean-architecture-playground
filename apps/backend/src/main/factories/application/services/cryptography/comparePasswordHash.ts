import { IComparePasswordHashService } from '@application/ports/services';
import { ComparePasswordHashService } from '@infra/cryptography';
import { BcryptPasswordHashComparer } from '@external/cryptography';

export const buildComparePasswordHashService =
  (): IComparePasswordHashService => {
    const adapter = new BcryptPasswordHashComparer();
    return new ComparePasswordHashService(adapter);
  };
