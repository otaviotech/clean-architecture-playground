import { HttpController } from '@infra/ports';
import { SignInController } from '@infra/web/controllers';
import { buildSignInUseCase } from '@main/factories/application/usecases';

export const buildSignInController = (): HttpController => {
  const signInUseCase = buildSignInUseCase();
  return new SignInController(signInUseCase);
};
