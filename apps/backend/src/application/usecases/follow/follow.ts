import { isLeft, left, right } from 'fp-ts/Either';
import { AlreadyFollowingError } from '@application/errors';
import {
  IFollowUseCase,
  FollowUseCaseInput,
  FollowUseCaseOutput,
  IGetFollowStatusUseCase,
} from '@application/ports/usecases';
import { IFollowRepository } from '@application/ports/repositories';

export class FollowUseCase implements IFollowUseCase {
  constructor(
    private readonly getFollowStatusUseCase: IGetFollowStatusUseCase,
    private readonly followRepository: IFollowRepository
  ) {}

  public async execute(
    input: FollowUseCaseInput
  ): Promise<FollowUseCaseOutput> {
    const { followerId, followedId } = input;

    const data = await this.getFollowStatusUseCase.execute({
      followerId,
      followedId,
    });

    if (isLeft(data)) {
      return left(data.left);
    }

    const isFollowing = data.right.isFollowing;

    if (isFollowing) {
      return left(new AlreadyFollowingError(followerId, followedId));
    }

    await this.followRepository.execute({ followerId, followedId });

    return right(undefined);
  }
}
