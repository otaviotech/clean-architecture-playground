import { UnfollowUseCase } from '@application/usecases';
import { IUnfollowUseCase } from '@application/ports/usecases';
import { buildGetFollowStatusUseCase } from './getFollowStatus';
import { buildUnfollowRepository } from '../repositories';

export const buildUnfollowUseCase = (): IUnfollowUseCase => {
  const getFollowStatusUseCase = buildGetFollowStatusUseCase();
  const unfollowRepository = buildUnfollowRepository();
  return new UnfollowUseCase(getFollowStatusUseCase, unfollowRepository);
};
