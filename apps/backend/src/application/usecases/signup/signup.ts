import { isLeft, isRight, left, right } from 'fp-ts/Either';
import { UsernameAlreadyTakenError } from '@application/errors';
import {
  ISignUpRepository,
  SignUpRepositoryOutput,
} from '@application/ports/repositories';
import {
  IFindProfileByUsernameUseCase,
  ISignUpUseCase,
  SignUpUseCaseInput,
  SignUpUseCaseOutput,
} from '@application/ports/usecases';
import { Profile } from '@domain/entities';

export class SignUpUseCase implements ISignUpUseCase {
  constructor(
    private readonly signUpRepository: ISignUpRepository,
    private readonly findProfileByUsernameUseCase: IFindProfileByUsernameUseCase
  ) {}

  async execute(input: SignUpUseCaseInput): Promise<SignUpUseCaseOutput> {
    const profileOrError = Profile.create({
      email: input.email,
      password: input.password,
      username: input.username,
    });

    if (isLeft(profileOrError)) {
      return left(profileOrError.left);
    }

    const profile = profileOrError.right;

    const alreadyExists = await this.alreadyExists(input.username);

    if (alreadyExists) {
      return left(new UsernameAlreadyTakenError(input.username));
    }

    const repoDto = await this.signUpRepository.execute({
      email: profile.email.value,
      username: profile.username,
      password: profile.password,
    });

    return this.mapResult(repoDto);
  }

  private mapResult(profile: SignUpRepositoryOutput): SignUpUseCaseOutput {
    return right({
      id: profile.id,
      username: profile.username,
      email: profile.email,
    });
  }

  private async alreadyExists(username: string): Promise<boolean> {
    const profile = await this.findProfileByUsernameUseCase.execute(username);
    return isRight(profile) && !!profile.right;
  }
}
