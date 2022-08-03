import { AsyncCommand } from '@shared/protocols';

export type UnfollowRepositoryInput = {
  followerId: string;
  followedId: string;
};

export type UnfollowRepositoryOutput = void;

export type IUnfollowRepository = AsyncCommand<
  UnfollowRepositoryInput,
  UnfollowRepositoryOutput
>;
