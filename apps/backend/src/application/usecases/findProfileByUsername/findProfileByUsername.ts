import { left, right } from 'fp-ts/Either';
import {
  FindProfileByUsernameRepositoryOutputBoundary,
  IFindProfileByUsernameRepository,
} from '@application/ports/repositories';
import {
  IFindProfileByUsernameUseCase,
  FindProfileByUsernameUseCaseInput,
  FindProfileByUsernameUseCaseOutput,
  FindProfileByUsernameUseCaseOutputBoundary,
} from '@application/ports/usecases';

export class FindProfileByUsernameUseCase
  implements IFindProfileByUsernameUseCase
{
  constructor(
    private readonly findProfileByUsernameRepository: IFindProfileByUsernameRepository
  ) {}

  async execute(
    input: FindProfileByUsernameUseCaseInput
  ): Promise<FindProfileByUsernameUseCaseOutput> {
    const data = await this.findProfileByUsernameRepository.execute(input);

    if (!data) {
      return left(null);
    }

    return right(this.mapResult(data));
  }

  private mapResult(
    data: FindProfileByUsernameRepositoryOutputBoundary
  ): FindProfileByUsernameUseCaseOutputBoundary {
    return {
      id: data.id,
      username: data.username,
      email: data.email,
      password: data.password,
      followers: [],
      following: [],
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }
}
