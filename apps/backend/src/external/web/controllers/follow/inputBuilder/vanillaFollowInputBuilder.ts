import { Either, left, right } from 'fp-ts/Either';
import { singleton } from 'tsyringe';

import { InputBuilder } from '@shared/protocols/inputBuilder';
import { FollowUseCaseInput } from '@application/ports/usecases';

@singleton()
export class VanillaFollowInputBuilder
  implements InputBuilder<FollowUseCaseInput>
{
  build(data: FollowUseCaseInput): Either<Error[], FollowUseCaseInput> {
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
