import { PrismaClient } from '@prisma/client';
import { IFollowRepository } from '@application/ports/repositories';
import { PrismaFollowRepository } from '@external/database/postgres/prisma/repositories';

export const buildFollowRepository = (): IFollowRepository => {
  const prismaClient = new PrismaClient();
  return new PrismaFollowRepository(prismaClient);
};
