import {
  IProfileExistsByIdRepository,
  ProfileExistsByIdRepositoryInput,
  ProfileExistsByIdRepositoryOutput,
} from '@application/ports/repositories';

export class ProfileExistsByIdRepositoryStub
  implements IProfileExistsByIdRepository
{
  execute(
    input: ProfileExistsByIdRepositoryInput
  ): Promise<ProfileExistsByIdRepositoryOutput> {
    return Promise.resolve(
      input.reduce((acc, profileId) => ({ ...acc, [profileId]: true }), {})
    );
  }
}
