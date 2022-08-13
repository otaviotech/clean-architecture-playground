import { FollowUseCase } from '@application/usecases';
import {
  buildFollowRepository,
  buildProfileExistsByIdRepository,
} from '@main/factories/application/repositories';
import { IFollowUseCase } from '@application/ports/usecases';
import { buildGetFollowStatusUseCase } from './getFollowStatus';

export const buildFollowUseCase = (): IFollowUseCase => {
  const followRepository = buildFollowRepository();
  const getFollowStatusUseCase = buildGetFollowStatusUseCase();
  const profileExistsByIdRepository = buildProfileExistsByIdRepository();

  return new FollowUseCase(
    getFollowStatusUseCase,
    profileExistsByIdRepository,
    followRepository
  );
};
