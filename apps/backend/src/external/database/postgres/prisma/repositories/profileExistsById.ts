import { inject, singleton } from 'tsyringe';
import { PrismaClient, Profile as PrismaProfile } from '@prisma/client';
import {
  ProfileExistsByIdRepositoryInput,
  ProfileExistsByIdRepositoryOutput,
  IProfileExistsByIdRepository,
} from '@application/ports/repositories';

@singleton()
export class PrismaProfileExistsByIdRepository
  implements IProfileExistsByIdRepository
{
  constructor(@inject('PrismaClient') private prismaClient: PrismaClient) {}

  async execute(
    profileIds: ProfileExistsByIdRepositoryInput
  ): Promise<ProfileExistsByIdRepositoryOutput> {
    const ormProfiles = await this.prismaClient.profile.findMany({
      where: { id: { in: profileIds } },
      select: { id: true },
    });

    return this.mapResult(ormProfiles);
  }

  private mapResult(
    profile: Pick<PrismaProfile, 'id'>[]
  ): ProfileExistsByIdRepositoryOutput {
    return profile.reduce(
      (acc, profile) => ({ ...acc, [profile.id]: true }),
      {}
    );
  }
}
