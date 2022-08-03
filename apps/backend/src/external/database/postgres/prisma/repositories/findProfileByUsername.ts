import { PrismaClient } from '@prisma/client';
import {
  FindProfileByUsernameRepositoryInput,
  FindProfileByUsernameRepositoryOutput,
  IFindProfileByUsernameRepository,
} from '@application/ports/repositories';
import { PrismaProfileMapper } from '../mappers/entities/profile';

export class PrismaFindProfileByUsernameRepository
  implements IFindProfileByUsernameRepository
{
  constructor(private prismaClient: PrismaClient) {}

  async execute(
    input: FindProfileByUsernameRepositoryInput
  ): Promise<FindProfileByUsernameRepositoryOutput> {
    const ormProfile = await this.prismaClient.profile.findFirst({
      where: { username: input },
    });

    if (!ormProfile) {
      return null;
    }

    return PrismaProfileMapper.toDomain(ormProfile);
  }
}
