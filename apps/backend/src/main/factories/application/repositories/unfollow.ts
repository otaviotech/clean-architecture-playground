import { PrismaClient } from '@prisma/client';
import { IUnfollowRepository } from '@application/ports/repositories';
import { PrismaUnfollowRepository } from '@external/database/postgres/prisma/repositories';

export const buildUnfollowRepository = (): IUnfollowRepository => {
  const prismaClient = new PrismaClient();
  return new PrismaUnfollowRepository(prismaClient);
};
