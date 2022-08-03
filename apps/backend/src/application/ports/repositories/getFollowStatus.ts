import { AsyncCommand } from '@shared/protocols';
import { Profile } from '@domain/entities';

export type GetFollowStatusRepositoryInput = {
  follower: Pick<Profile, 'id'>;
  followed: Pick<Profile, 'id'>;
};

export type GetFollowStatusRepositoryOutput = {
  isFollowing: boolean;
  isFollowed: boolean;
};

export type IGetFollowStatusRepository = AsyncCommand<
  GetFollowStatusRepositoryInput,
  GetFollowStatusRepositoryOutput
>;
