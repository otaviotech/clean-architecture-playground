import { left, right } from 'fp-ts/Either';
import { isSome, none, Option, some } from 'fp-ts/Option';

// Application (self)
import {
  GetFollowStatusUseCaseInput,
  GetFollowStatusUseCaseOutput,
  IGetFollowStatusUseCase,
} from '@application/ports/usecases';

import {
  GetFollowStatusRepositoryOutput,
  IGetFollowStatusRepository,
  IProfileExistsByIdRepository,
} from '@application/ports/repositories';
import { ResourceNotFoundError } from '@application/errors';

export class GetFollowStatusUseCase implements IGetFollowStatusUseCase {
  constructor(
    private readonly getFollowStatusRepository: IGetFollowStatusRepository,
    private readonly profileExistsByIdRepository: IProfileExistsByIdRepository
  ) {}

  async execute(
    input: GetFollowStatusUseCaseInput
  ): Promise<GetFollowStatusUseCaseOutput> {
    const { followerId, followedId } = input;

    const profilesNotFound = await this.getNotFoundProfileIds(
      followerId,
      followedId
    );

    if (isSome(profilesNotFound)) {
      return left(
        new ResourceNotFoundError('profile', profilesNotFound.value[0])
      );
    }

    const data = await this.getFollowStatusRepository.execute({
      followerId,
      followedId,
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

  private async getNotFoundProfileIds(
    followerId: string,
    followedId: string
  ): Promise<Option<string[]>> {
    const exists = await this.profileExistsByIdRepository.execute([
      followerId,
      followedId,
    ]);

    const notFound = [followerId, followedId].filter((id) => !exists[id]);

    if (notFound.length) {
      return some(notFound);
    }

    return none;
  }
}
