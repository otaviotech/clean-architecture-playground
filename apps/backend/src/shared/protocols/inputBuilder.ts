import { Either } from 'fp-ts/Either';

export interface InputBuilder<T> {
  build(data: unknown): Either<Error[], T>;
}
