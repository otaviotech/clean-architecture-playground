import { Either, left, right } from 'fp-ts/Either';
import { InputBuilder } from '@shared/protocols';
import { GetFollowStatusUseCaseInput } from '@application/ports/usecases';

export class GetFollowStatusInputBuilder
  implements InputBuilder<GetFollowStatusUseCaseInput>
{
  build(
    data: GetFollowStatusUseCaseInput
  ): Either<Error[], GetFollowStatusUseCaseInput> {
    const { followerId, followedId } = data;
    const errors: Error[] = [];

    Object.entries({ followedId, followerId }).forEach(([key, value]) => {
      if (!value) {
        errors.push(new Error(`field ${key} is required`));
      }
    });

    if (errors.length > 0) {
      return left(errors);
    }

    return right(data);
  }
}
