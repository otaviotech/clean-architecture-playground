import { UnfollowController } from '@infra/web/controllers';
import { buildUnfollowUseCase } from '@main/factories/application/usecases';

export const buildUnfollowController = () => {
  const signUpUseCase = buildUnfollowUseCase();
  return new UnfollowController(signUpUseCase);
};
