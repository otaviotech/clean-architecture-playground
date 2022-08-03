import { PrismaClient } from '@prisma/client';
import {
  UnfollowRepositoryInput,
  UnfollowRepositoryOutput,
  IUnfollowRepository,
} from '@application/ports/repositories';

export class PrismaUnfollowRepository implements IUnfollowRepository {
  constructor(private prismaClient: PrismaClient) {}

  async execute(
    input: UnfollowRepositoryInput
  ): Promise<UnfollowRepositoryOutput> {
    await this.prismaClient.follow.deleteMany({
      where: {
        followerId: input.followerId,
        followedId: input.followedId,
      },
    });
  }
}
