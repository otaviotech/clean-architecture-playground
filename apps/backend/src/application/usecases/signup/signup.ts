import { Profile } from '@domain/entities';
import { UsernameAlreadyTakenError } from '@application/errors';
import { ISignUpRepository } from '@application/ports/repositories';
import {
  IFindProfileByUsernameUseCase,
  ISignUpUseCase,
  SignUpUseCaseInput,
  SignUpUseCaseOutput,
} from '@application/ports/usecases';
import { isRight, left, right } from 'fp-ts/Either';

export class SignUpUseCase implements ISignUpUseCase {
  constructor(
    private readonly signUpRepository: ISignUpRepository,
    private readonly findProfileByUsernameUseCase: IFindProfileByUsernameUseCase
  ) {}

  async execute(input: SignUpUseCaseInput): Promise<SignUpUseCaseOutput> {
    const alreadyExists = await this.alreadyExists(input.username);

    if (alreadyExists) {
      return left(new UsernameAlreadyTakenError(input.username));
    }

    const profile = await this.signUpRepository.execute({
      email: input.email,
      username: input.username,
      password: input.password,
    });

    return this.mapResult(profile);
  }

  private mapResult(profile: Profile): SignUpUseCaseOutput {
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
