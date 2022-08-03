import { Either } from 'fp-ts/Either';
import { AsyncCommand } from '@shared/protocols';

export type FindProfileByUsernameUseCaseInput = string;
export type FindProfileByUsernameUseCaseOutputBoundary = {
  id: string;
  username: string;
  email: string;
  password: string;
  followers: FindProfileByUsernameUseCaseOutputBoundary[];
  following: FindProfileByUsernameUseCaseOutputBoundary[];
  createdAt: Date;
  updatedAt: Date;
};

export type FindProfileByUsernameUseCaseOutput = Either<
  null,
  FindProfileByUsernameUseCaseOutputBoundary
>;

export type IFindProfileByUsernameUseCase = AsyncCommand<
  FindProfileByUsernameUseCaseInput,
  FindProfileByUsernameUseCaseOutput
>;
