import { AsyncCommand } from '@shared/protocols';
import { Either } from 'fp-ts/Either';

export type GetFollowStatusUseCaseInput = {
  followerId: string;
  followedId: string;
};

export type GetFollowStatusUseCaseOutputBoundary = {
  isFollowing: boolean;
  isFollowed: boolean;
};

export type GetFollowStatusUseCaseOutput = Either<
  Error,
  GetFollowStatusUseCaseOutputBoundary
>;

export type IGetFollowStatusUseCase = AsyncCommand<
  GetFollowStatusUseCaseInput,
  GetFollowStatusUseCaseOutput
>;
