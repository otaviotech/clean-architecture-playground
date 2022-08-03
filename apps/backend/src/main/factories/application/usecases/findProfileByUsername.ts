import { PrismaClient } from '@prisma/client';
import { FindProfileByUsernameUseCase } from '@application/usecases';
import { PrismaFindProfileByUsernameRepository } from '@external/database/postgres/prisma/repositories';
import { IFindProfileByUsernameUseCase } from '@application/ports/usecases';

export const buildFindProfileByUsernameUseCase =
  (): IFindProfileByUsernameUseCase => {
    const prismaClient = new PrismaClient();

    const findProfileByUsernameRepository =
      new PrismaFindProfileByUsernameRepository(prismaClient);

    return new FindProfileByUsernameUseCase(findProfileByUsernameRepository);
  };
