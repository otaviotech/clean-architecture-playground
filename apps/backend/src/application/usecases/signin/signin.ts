import { isLeft, left, right } from 'fp-ts/lib/Either';
import {
  IFindProfileByUsernameUseCase,
  ISignInUseCase,
  SignInUseCaseInput,
  SignInUseCaseOutput,
} from '@application/ports/usecases';

import { IComparePasswordHashService } from '@application/ports/services';
import { InvalidCredentialsError } from '@application/errors';
import { IGenerateAuthTokenService } from '@application/ports/services/authentication';

export class SignInUseCase implements ISignInUseCase {
  constructor(
    private readonly findProfileByUsernameUseCase: IFindProfileByUsernameUseCase,
    private readonly comparePasswordHashService: IComparePasswordHashService,
    private readonly generateAuthTokenService: IGenerateAuthTokenService
  ) {}

  async execute(input: SignInUseCaseInput): Promise<SignInUseCaseOutput> {
    const profileData = await this.findProfileByUsernameUseCase.execute(
      input.username
    );

    if (isLeft(profileData)) {
      return left(new InvalidCredentialsError());
    }

    const passwordIsCorrect = await this.comparePasswordHashService.execute({
      plain: input.password,
      hashed: profileData.right.password,
    });

    if (!passwordIsCorrect) {
      return left(new InvalidCredentialsError());
    }

    const authToken = await this.generateAuthTokenService.execute({
      payload: {
        id: profileData.right.id,
      },
    });

    return right({ authToken });
  }
}
