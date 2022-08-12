import { AsyncCommand } from '@shared/protocols';

export type GetFollowStatusRepositoryInput = {
  followerId: string;
  followedId: string;
};

export type GetFollowStatusRepositoryOutput = {
  isFollowing: boolean;
  isFollowed: boolean;
};

export type IGetFollowStatusRepository = AsyncCommand<
  GetFollowStatusRepositoryInput,
  GetFollowStatusRepositoryOutput
>;
