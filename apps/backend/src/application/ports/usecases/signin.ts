import { Either } from 'fp-ts/Either';
import { AsyncCommand } from '@shared/protocols';
import { InvalidCredentialsError } from '@application/errors';

export type SignInUseCaseInput = {
  username: string;
  password: string;
};

export type SignInError = Error | InvalidCredentialsError;

export type SignInUseCaseOutputBoundary = {
  authToken: string;
};

export type SignInUseCaseOutput = Either<
  SignInError,
  SignInUseCaseOutputBoundary
>;

export type ISignInUseCase = AsyncCommand<
  SignInUseCaseInput,
  SignInUseCaseOutput
>;
