import { SignInUseCase } from '@application/usecases/signin';
import { ISignInUseCase } from '@application/ports/usecases';

import { buildGenerateAuthTokenService } from '@main/factories/application/services/authentication';
import { buildComparePasswordHashService } from '@main/factories/application/services/cryptography';
import { buildFindProfileByUsernameUseCase } from '@main/factories/application/usecases';

export const buildSignInUseCase = (): ISignInUseCase => {
  const findProfileByUsernameUseCase = buildFindProfileByUsernameUseCase();
  const comparePasswordHashService = buildComparePasswordHashService();
  const generateAuthTokenService = buildGenerateAuthTokenService();

  return new SignInUseCase(
    findProfileByUsernameUseCase,
    comparePasswordHashService,
    generateAuthTokenService
  );
};
