import { AsyncCommand } from '@shared/protocols';

export type FollowRepositoryInput = {
  followerId: string;
  followedId: string;
};

export type FollowRepositoryOutput = void;

export type IFollowRepository = AsyncCommand<
  FollowRepositoryInput,
  FollowRepositoryOutput
>;
