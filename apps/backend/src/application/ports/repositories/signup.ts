import { AsyncCommand } from '@shared/protocols';

export type SignUpRepositoryInput = {
  username: string;
  email: string;
  password: string;
};

export type SignUpRepositoryOutput = {
  id: string;
  username: string;
  email: string;
  password: string;
};

export type ISignUpRepository = AsyncCommand<
  SignUpRepositoryInput,
  SignUpRepositoryOutput
>;
