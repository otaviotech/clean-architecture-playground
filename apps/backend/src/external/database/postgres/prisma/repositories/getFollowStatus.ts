import { PrismaClient } from '@prisma/client';

import {
  GetFollowStatusRepositoryInput,
  GetFollowStatusRepositoryOutput,
  IGetFollowStatusRepository,
} from '@application/ports/repositories';

export class PrismaGetFollowStatusRepository
  implements IGetFollowStatusRepository
{
  constructor(private prismaClient: PrismaClient) {}

  async execute(
    input: GetFollowStatusRepositoryInput
  ): Promise<GetFollowStatusRepositoryOutput> {
    const data = await this.prismaClient.follow.findMany({
      where: {
        OR: [
          {
            followedId: input.followedId,
            followerId: input.followerId,
          },
          {
            followedId: input.followerId,
            followerId: input.followedId,
          },
        ],
      },
    });

    const isFollowing = data.some((f) => input.followerId === f.followerId);
    const isFollowed = data.some((f) => input.followerId === f.followedId);

    return { isFollowed, isFollowing };
  }
}
