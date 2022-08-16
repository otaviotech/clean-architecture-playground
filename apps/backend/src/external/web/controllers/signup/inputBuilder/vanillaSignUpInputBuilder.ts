import { Either, left, right } from 'fp-ts/Either';
import { singleton } from 'tsyringe';

import { InputBuilder } from '@shared/protocols/inputBuilder';
import { SignUpUseCaseInput } from '@application/ports/usecases';

@singleton()
export class VanillaSignUpInputBuilder
  implements InputBuilder<SignUpUseCaseInput>
{
  build(data: SignUpUseCaseInput): Either<Error[], SignUpUseCaseInput> {
    const { username, email, password } = data ?? {};

    const errors: Error[] = [];

    Object.entries({ username, email, password }).forEach(([key, value]) => {
      if (!value) {
        errors.push(new Error(`field ${key} is required`));
      }
    });

    if (errors.length > 0) {
      return left(errors);
    }

    return right({ email, username, password });
  }
}
