import { SignUpUseCase } from '@application/usecases';

import { buildFindProfileByUsernameUseCase } from './findProfileByUsername';
import { buildSignUpRepository } from '@main/factories/application/repositories';
import { ISignUpUseCase } from '@application/ports/usecases';

export const buildSignUpUseCase = (): ISignUpUseCase => {
  const findProfileByUsernameUseCase = buildFindProfileByUsernameUseCase();
  const signUpRepository = buildSignUpRepository();
  return new SignUpUseCase(signUpRepository, findProfileByUsernameUseCase);
};
