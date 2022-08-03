import { Either, left, right } from 'fp-ts/Either';

// Shared
import { InputBuilder } from '@shared/protocols';

// Application (self)
import { UnfollowUseCaseInput } from '@application/ports/usecases';

export class UnfollowInputBuilder
  implements InputBuilder<UnfollowUseCaseInput>
{
  build(data: UnfollowUseCaseInput): Either<Error[], UnfollowUseCaseInput> {
    const { followedId, followerId } = data ?? {};

    const errors: Error[] = [];

    Object.entries({ followedId, followerId }).forEach(([key, value]) => {
      if (!value) {
        errors.push(new Error(`field ${key} is required`));
      }
    });

    if (errors.length > 0) {
      return left(errors);
    }

    return right({ followedId, followerId });
  }
}
