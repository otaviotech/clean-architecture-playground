import { AsyncCommand } from '@shared/protocols';

export type ProfileExistsByIdRepositoryInput = string[];

export type ProfileExistsByIdRepositoryOutput = {
  [profileId: string]: boolean;
};

export type IProfileExistsByIdRepository = AsyncCommand<
  ProfileExistsByIdRepositoryInput,
  ProfileExistsByIdRepositoryOutput
>;
