import { PrismaClient } from '@prisma/client';
import { IProfileExistsByIdRepository } from '@application/ports/repositories';
import { PrismaProfileExistsByIdRepository } from '@external/database/postgres/prisma/repositories';

export const buildProfileExistsByIdRepository =
  (): IProfileExistsByIdRepository => {
    const prismaClient = new PrismaClient();
    return new PrismaProfileExistsByIdRepository(prismaClient);
  };
