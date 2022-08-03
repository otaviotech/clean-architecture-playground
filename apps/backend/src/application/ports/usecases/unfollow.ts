import { AsyncCommand } from '@shared/protocols';
import { Either } from 'fp-ts/Either';

export type UnfollowUseCaseInput = {
  followerId: string;
  followedId: string;
};

export type UnfollowUseCaseOutput = Either<Error, void>;

export type IUnfollowUseCase = AsyncCommand<
  UnfollowUseCaseInput,
  UnfollowUseCaseOutput
>;
