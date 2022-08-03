import { AsyncCommand } from '@shared/protocols';
import { Either } from 'fp-ts/Either';
import { AlreadyFollowingError } from '../../errors';

export type FollowUseCaseInput = {
  followerId: string;
  followedId: string;
};

export type FollowUseCaseError = Error | AlreadyFollowingError;

export type FollowUseCaseOutput = Either<FollowUseCaseError, void>;

export type IFollowUseCase = AsyncCommand<
  FollowUseCaseInput,
  FollowUseCaseOutput
>;
