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
            followedId: input.followed.id,
            followerId: input.follower.id,
          },
          {
            followedId: input.follower.id,
            followerId: input.followed.id,
          },
        ],
      },
    });

    const isFollowing = data.some((f) => input.follower.id === f.followerId);
    const isFollowed = data.some((f) => input.follower.id === f.followedId);

    return {
      isFollowed,
      isFollowing,
    };
  }
}
