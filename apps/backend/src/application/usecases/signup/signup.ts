import { isLeft, isRight, left, right } from 'fp-ts/Either';
import { inject, singleton } from 'tsyringe';
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
import { IHashPasswordService } from '@application/ports/services';
import { Profile } from '@domain/entities';

@singleton()
export class SignUpUseCase implements ISignUpUseCase {
  constructor(
    @inject('ISignUpRepository')
    private readonly signUpRepository: ISignUpRepository,

    @inject('IFindProfileByUsernameUseCase')
    private readonly findProfileByUsernameUseCase: IFindProfileByUsernameUseCase,

    @inject('IHashPasswordService')
    private readonly hashPasswordService: IHashPasswordService
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

    const passwordHash = await this.hashPasswordService.execute(input.password);

    const repoDto = await this.signUpRepository.execute({
      email: profile.email.value,
      username: profile.username.value,
      password: passwordHash,
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
