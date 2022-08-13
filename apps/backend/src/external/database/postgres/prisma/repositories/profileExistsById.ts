import { PrismaClient, Profile as PrismaProfile } from '@prisma/client';
import {
  ProfileExistsByIdRepositoryInput,
  ProfileExistsByIdRepositoryOutput,
  IProfileExistsByIdRepository,
} from '@application/ports/repositories';

export class PrismaProfileExistsByIdRepository
  implements IProfileExistsByIdRepository
{
  constructor(private prismaClient: PrismaClient) {}

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
