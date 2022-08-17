import { Either, left, right } from 'fp-ts/Either';
import { singleton } from 'tsyringe';

import { InputBuilder } from '@shared/protocols/inputBuilder';
import { SignInUseCaseInput } from '@application/ports/usecases';

@singleton()
export class VanillaSignInInputBuilder
  implements InputBuilder<SignInUseCaseInput>
{
  build(data: SignInUseCaseInput): Either<Error[], SignInUseCaseInput> {
    const { username, password } = data ?? {};

    const errors: Error[] = [];

    Object.entries({ username, password }).forEach(([key, value]) => {
      if (!value) {
        errors.push(new Error(`field ${key} is required`));
      }
    });

    if (errors.length > 0) {
      return left(errors);
    }

    return right({ username, password });
  }
}
