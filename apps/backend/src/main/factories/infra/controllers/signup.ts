import { SignUpController } from '@infra/web/controllers';
import { buildSignUpUseCase } from '@main/factories/application/usecases';

export const buildSignUpController = () => {
  const signUpUseCase = buildSignUpUseCase();
  return new SignUpController(signUpUseCase);
};
