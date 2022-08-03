import { FollowController } from '@infra/web/controllers';
import { buildFollowUseCase } from '@main/factories/application/usecases';

export const buildFollowController = () => {
  const signUpUseCase = buildFollowUseCase();
  return new FollowController(signUpUseCase);
};
