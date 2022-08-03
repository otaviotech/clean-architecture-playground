import { FollowUseCase } from '@application/usecases';
import { buildFollowRepository } from '@main/factories/application/repositories';
import { IFollowUseCase } from '@application/ports/usecases';
import { buildGetFollowStatusUseCase } from './getFollowStatus';

export const buildFollowUseCase = (): IFollowUseCase => {
  const followRepository = buildFollowRepository();
  const getFollowStatusUseCase = buildGetFollowStatusUseCase();
  return new FollowUseCase(getFollowStatusUseCase, followRepository);
};
