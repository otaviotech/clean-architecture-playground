import { isLeft, left, right } from 'fp-ts/Either';
import {
  AlreadyFollowingError,
  ResourceNotFoundError,
} from '@application/errors';
import {
  IFollowUseCase,
  FollowUseCaseInput,
  FollowUseCaseOutput,
  IGetFollowStatusUseCase,
} from '@application/ports/usecases';
import {
  IFollowRepository,
  IProfileExistsByIdRepository,
} from '@application/ports/repositories';

export class FollowUseCase implements IFollowUseCase {
  constructor(
    private readonly getFollowStatusUseCase: IGetFollowStatusUseCase,
    private readonly profileExistsByIdRepository: IProfileExistsByIdRepository,
    private readonly followRepository: IFollowRepository
  ) {}

  public async execute(
    input: FollowUseCaseInput
  ): Promise<FollowUseCaseOutput> {
    const { followerId, followedId } = input;

    const bothProfileExists = await this.bothProfileExists(
      followerId,
      followedId
    );

    if (!bothProfileExists) {
      return left(new ResourceNotFoundError('profile', followedId));
    }

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

  private async bothProfileExists(
    followerId: string,
    followedId: string
  ): Promise<boolean> {
    const exists = await this.profileExistsByIdRepository.execute([
      followerId,
      followedId,
    ]);

    return exists[followerId] && exists[followedId];
  }
}
