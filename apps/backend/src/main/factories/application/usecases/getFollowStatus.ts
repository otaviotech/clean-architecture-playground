import { IGetFollowStatusUseCase } from '@application/ports/usecases';
import { GetFollowStatusUseCase } from '@application/usecases';
import {
  buildGetFollowStatusRepository,
  buildProfileExistsByIdRepository,
} from '../repositories';

export const buildGetFollowStatusUseCase = (): IGetFollowStatusUseCase => {
  const getFollowStatusRepository = buildGetFollowStatusRepository();
  const profileExistsByIdRepository = buildProfileExistsByIdRepository();

  return new GetFollowStatusUseCase(
    getFollowStatusRepository,
    profileExistsByIdRepository
  );
};
