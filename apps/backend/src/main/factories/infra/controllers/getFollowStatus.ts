import { PrismaClient } from '@prisma/client';
import { GetFollowStatusUseCase } from '@application/usecases';
import { PrismaGetFollowStatusRepository } from '@external/database/postgres/prisma/repositories/getFollowStatus';
import { GetFollowStatusController } from '@infra/web/controllers/getFollowStatus';
import { HttpController } from '@infra/ports';
import { buildProfileExistsByIdRepository } from '../../application/repositories';

export const buildGetFollowStatusController = (): HttpController => {
  const prismaClient = new PrismaClient();
  const getFollowStatusRepository = new PrismaGetFollowStatusRepository(
    prismaClient
  );
  const profileExistsByIdRepository = buildProfileExistsByIdRepository();

  const getFollowStatusUC = new GetFollowStatusUseCase(
    getFollowStatusRepository,
    profileExistsByIdRepository
  );

  return new GetFollowStatusController(getFollowStatusUC);
};
