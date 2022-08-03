import { right } from 'fp-ts/Either';

// Application (self)
import {
  GetFollowStatusUseCaseInput,
  GetFollowStatusUseCaseOutput,
  IGetFollowStatusUseCase,
} from '@application/ports/usecases';

import {
  GetFollowStatusRepositoryOutput,
  IGetFollowStatusRepository,
} from '@application/ports/repositories';

export class GetFollowStatusUseCase implements IGetFollowStatusUseCase {
  constructor(
    private readonly getFollowStatusRepository: IGetFollowStatusRepository
  ) {}

  async execute(
    input: GetFollowStatusUseCaseInput
  ): Promise<GetFollowStatusUseCaseOutput> {
    const { followerId, followedId } = input;

    const data = await this.getFollowStatusRepository.execute({
      follower: { id: followerId },
      followed: { id: followedId },
    });

    return this.mapResult(data);
  }

  private mapResult(
    data: GetFollowStatusRepositoryOutput
  ): GetFollowStatusUseCaseOutput {
    return right({
      isFollowing: data.isFollowing,
      isFollowed: data.isFollowed,
    });
  }
}
