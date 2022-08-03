import { IGetFollowStatusUseCase } from '@application/ports/usecases';
import { GetFollowStatusUseCase } from '@application/usecases';
import { buildGetFollowStatusRepository } from '../repositories';

export const buildGetFollowStatusUseCase = (): IGetFollowStatusUseCase => {
  const getFollowStatusRepository = buildGetFollowStatusRepository();
  return new GetFollowStatusUseCase(getFollowStatusRepository);
};
