import { AsyncCommand } from '@shared/protocols';

export type FindProfileByUsernameRepositoryInput = string;

export type FindProfileByUsernameRepositoryOutputBoundary = {
  id: string;
  username: string;
  email: string;
  password: string;
};

export type FindProfileByUsernameRepositoryOutput =
  FindProfileByUsernameRepositoryOutputBoundary | null;

export type IFindProfileByUsernameRepository = AsyncCommand<
  FindProfileByUsernameRepositoryInput,
  FindProfileByUsernameRepositoryOutput
>;
