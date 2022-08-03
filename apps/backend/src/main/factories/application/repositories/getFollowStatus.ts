import { PrismaClient } from '@prisma/client';
import { IGetFollowStatusRepository } from '@application/ports/repositories';
import { PrismaGetFollowStatusRepository } from '@external/database/postgres/prisma/repositories';

export const buildGetFollowStatusRepository =
  (): IGetFollowStatusRepository => {
    const prismaClient = new PrismaClient();
    return new PrismaGetFollowStatusRepository(prismaClient);
  };
