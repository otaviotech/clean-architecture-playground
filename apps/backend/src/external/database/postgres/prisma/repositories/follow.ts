import { inject, singleton } from 'tsyringe';
import { PrismaClient } from '@prisma/client';
import {
  FollowRepositoryInput,
  FollowRepositoryOutput,
  IFollowRepository,
} from '@application/ports/repositories';

@singleton()
export class PrismaFollowRepository implements IFollowRepository {
  constructor(@inject('PrismaClient') private prismaClient: PrismaClient) {}

  async execute(input: FollowRepositoryInput): Promise<FollowRepositoryOutput> {
    await this.prismaClient.follow.create({
      data: {
        followerId: input.followerId,
        followedId: input.followedId,
      },
    });
  }
}
