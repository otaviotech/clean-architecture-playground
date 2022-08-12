import { Either, left, right } from 'fp-ts/lib/Either';
import Joi from 'joi';
import { ValueObject, ValueObjectProps } from '@domain/shared';
import { InvalidEmailError } from '@domain/errors';

export interface EmailProps extends ValueObjectProps {
  value: string;
}

export class Email extends ValueObject<EmailProps> {
  public get value(): string {
    return this.props.value;
  }

  public static create(input: string): Either<Error, Email> {
    const isValid = !Joi.string().email().validate(input).error;

    if (!isValid) {
      return left(new InvalidEmailError(input));
    }

    return right(new Email({ value: input }));
  }
}
