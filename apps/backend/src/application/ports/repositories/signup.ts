import { AsyncCommand } from '@shared/protocols';
import { Profile } from '@domain/entities';

export type SignUpRepositoryInput = {
  username: string;
  email: string;
  password: string;
};

export type SignUpRepositoryOutput = Profile;

export type ISignUpRepository = AsyncCommand<
  SignUpRepositoryInput,
  SignUpRepositoryOutput
>;
