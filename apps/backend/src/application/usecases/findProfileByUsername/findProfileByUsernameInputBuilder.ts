import { Either, left, right } from 'fp-ts/Either';
import { InputBuilder } from '@shared/protocols';
import { FindProfileByUsernameUseCaseInput } from '@application/ports/usecases';

export class FindProfileByUsernameInputBuilder
  implements InputBuilder<FindProfileByUsernameUseCaseInput>
{
  build(
    data: FindProfileByUsernameUseCaseInput
  ): Either<Error[], FindProfileByUsernameUseCaseInput> {
    const errors: Error[] = [];

    if (!data) {
      errors.push(new Error(`username is required`));
    }

    if (errors.length > 0) {
      return left(errors);
    }

    return right(data);
  }
}
