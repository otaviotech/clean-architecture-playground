import { ISignUpUseCase } from '@application/ports/usecases';
import { SignUpUseCase } from '@application/usecases';

import { buildFindProfileByUsernameUseCase } from '@main/factories/application/usecases';
import { buildSignUpRepository } from '@main/factories/application/repositories';
import { buildHashPasswordService } from '@main/factories/application/services/cryptography';

export const buildSignUpUseCase = (): ISignUpUseCase => {
  const findProfileByUsernameUseCase = buildFindProfileByUsernameUseCase();
  const signUpRepository = buildSignUpRepository();
  const hashPasswordService = buildHashPasswordService();

  return new SignUpUseCase(
    signUpRepository,
    findProfileByUsernameUseCase,
    hashPasswordService
  );
};
