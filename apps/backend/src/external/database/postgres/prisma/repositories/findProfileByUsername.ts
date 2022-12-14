import { PrismaClient, Profile as PrismaProfile } from '@prisma/client';
import {
  FindProfileByUsernameRepositoryInput,
  FindProfileByUsernameRepositoryOutput,
  IFindProfileByUsernameRepository,
} from '@application/ports/repositories';
import { inject, singleton } from 'tsyringe';

@singleton()
export class PrismaFindProfileByUsernameRepository
  implements IFindProfileByUsernameRepository
{
  constructor(@inject('PrismaClient') private prismaClient: PrismaClient) {}

  async execute(
    input: FindProfileByUsernameRepositoryInput
  ): Promise<FindProfileByUsernameRepositoryOutput> {
    const ormProfile = await this.prismaClient.profile.findFirst({
      where: { username: input },
    });

    if (!ormProfile) {
      return null;
    }

    return this.mapResult(ormProfile);
  }

  private mapResult(
    profile: PrismaProfile
  ): FindProfileByUsernameRepositoryOutput {
    return {
      id: profile.id,
      username: profile.username,
      email: profile.email,
      password: profile.password,
    };
  }
}
