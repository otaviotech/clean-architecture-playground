import { isLeft, left } from 'fp-ts/Either';

// Infra (selfe)
import {
  IGetFollowStatusUseCase,
  IUnfollowUseCase,
  UnfollowUseCaseInput,
  UnfollowUseCaseOutput,
} from '@application/ports/usecases';
import { NotFollowingError } from '@application/errors';
import { IUnfollowRepository } from '@application/ports/repositories';

export class UnfollowUseCase implements IUnfollowUseCase {
  constructor(
    private readonly getFollowStatusUseCase: IGetFollowStatusUseCase,
    private readonly unfollowRepository: IUnfollowRepository
  ) {}

  async execute(input: UnfollowUseCaseInput): Promise<UnfollowUseCaseOutput> {
    const { followerId, followedId } = input;

    const statusOrError = await this.getFollowStatusUseCase.execute({
      followerId,
      followedId,
    });

    if (isLeft(statusOrError)) {
      return left(statusOrError.left);
    }

    const isFollowing = statusOrError.right;

    if (!isFollowing) {
      throw new NotFollowingError(followerId, followedId);
    }

    await this.unfollowRepository.execute({ followerId, followedId });
  }
}
