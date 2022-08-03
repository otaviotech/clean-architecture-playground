import { isLeft, isRight, right } from 'fp-ts/Either';

// Application (self)
import { AlreadyFollowingError } from '@application/errors';
import { FollowUseCaseInput } from '@application/ports/usecases';

// SUT: FollowUseCase
import { FollowUseCase } from './follow';

// Stubs
import { GetFollowStatusUseCaseStub } from '@test/stubs/application/usecases';
import { FollowRepositoryStub } from '@test/stubs/application/repositories';

const makeSut = () => {
  const getFollowStatusUseCase = new GetFollowStatusUseCaseStub();
  const followRepository = new FollowRepositoryStub();
  const sut = new FollowUseCase(getFollowStatusUseCase, followRepository);

  return {
    sut,
    getFollowStatusUseCase,
    followRepository,
  };
};

describe('FollowUseCase', () => {
  it('should fail if is already following', async () => {
    const { sut } = makeSut();

    const input: FollowUseCaseInput = {
      followerId: 'followerId',
      followedId: 'followedId',
    };

    const result = await sut.execute(input);

    if (isLeft(result)) {
      expect(result.left).toEqual(
        new AlreadyFollowingError('followerId', 'followedId')
      );
    } else {
      throw new Error('Should have returned an AlreadyFollowingError');
    }
  });

  it('should persist a new follow', async () => {
    const { sut, followRepository, getFollowStatusUseCase } = makeSut();

    jest.spyOn(followRepository, 'execute');

    jest.spyOn(getFollowStatusUseCase, 'execute').mockResolvedValue(
      right({
        isFollowed: false,
        isFollowing: false,
      })
    );

    const input: FollowUseCaseInput = {
      followerId: 'followerId',
      followedId: 'followedId',
    };

    const result = await sut.execute(input);

    expect(isRight(result)).toBe(true);

    expect(followRepository.execute).toHaveBeenCalledWith({
      followerId: 'followerId',
      followedId: 'followedId',
    });
  });
});
