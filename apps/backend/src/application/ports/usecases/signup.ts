import { Either } from 'fp-ts/Either';
import { AsyncCommand } from '@shared/protocols';
import {
  EmailAlreadyTakenError,
  UsernameAlreadyTakenError,
} from '@application/errors';

export type SignUpUseCaseInput = {
  username: string;
  email: string;
  password: string;
};

export type SignUpError =
  | Error
  | EmailAlreadyTakenError
  | UsernameAlreadyTakenError;

export type SignUpUseCaseOutputBoundary = {
  id: string;
  username: string;
  email: string;
};

export type SignUpUseCaseOutput = Either<
  SignUpError,
  SignUpUseCaseOutputBoundary
>;

export type ISignUpUseCase = AsyncCommand<
  SignUpUseCaseInput,
  SignUpUseCaseOutput
>;
