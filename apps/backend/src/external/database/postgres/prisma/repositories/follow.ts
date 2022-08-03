import { PrismaClient } from '@prisma/client';
import {
  FollowRepositoryInput,
  FollowRepositoryOutput,
  IFollowRepository,
} from '@application/ports/repositories';

export class PrismaFollowRepository implements IFollowRepository {
  constructor(private prismaClient: PrismaClient) {}

  async execute(input: FollowRepositoryInput): Promise<FollowRepositoryOutput> {
    await this.prismaClient.follow.create({
      data: {
        followerId: input.followerId,
        followedId: input.followedId,
      },
    });
  }
}
