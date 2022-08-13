import { Either, left, right } from 'fp-ts/lib/Either';
import Joi from 'joi';
import { ValueObject, ValueObjectProps } from '@domain/shared';
import { InvalidUsernameError } from '@domain/errors';

export interface UsernameProps extends ValueObjectProps {
  value: string;
}

export class Username extends ValueObject<UsernameProps> {
  public get value(): string {
    return this.props.value;
  }

  public static create(input: string): Either<Error, Username> {
    const regex = /^[a-z\d._]+$/;

    const isValid = !Joi.string().pattern(regex).validate(input).error;

    if (!isValid) {
      return left(new InvalidUsernameError(input));
    }

    return right(new Username({ value: input }));
  }
}
