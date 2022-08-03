import { PrismaClient } from '@prisma/client';
import { GetFollowStatusUseCase } from '@application/usecases';
import { PrismaGetFollowStatusRepository } from '@external/database/postgres/prisma/repositories/getFollowStatus';
import { GetFollowStatusController } from '@infra/web/controllers/getFollowStatus';
import { HttpController } from '@infra/ports';

export const buildGetFollowStatusController = (): HttpController => {
  const prismaClient = new PrismaClient();

  const getFollowStatusUC = new GetFollowStatusUseCase(
    new PrismaGetFollowStatusRepository(prismaClient)
  );

  return new GetFollowStatusController(getFollowStatusUC);
};
