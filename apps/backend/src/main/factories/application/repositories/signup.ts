import { PrismaClient } from '@prisma/client';
import { ISignUpRepository } from '@application/ports/repositories';
import { PrismaSignUpRepository } from '@external/database/postgres/prisma/repositories';

export const buildSignUpRepository = (): ISignUpRepository => {
  const prismaClient = new PrismaClient();
  return new PrismaSignUpRepository(prismaClient);
};
