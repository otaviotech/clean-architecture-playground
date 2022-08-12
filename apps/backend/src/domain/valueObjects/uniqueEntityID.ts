import { v4 as uuid } from 'uuid';
import { Either, left, right } from 'fp-ts/lib/Either';
import Joi from 'joi';
import { ValueObject, ValueObjectProps } from '@domain/shared';

export interface UniqueEntityIDProps extends ValueObjectProps {
  value: string;
}

export class UniqueEntityID extends ValueObject<UniqueEntityIDProps> {
  constructor(id?: string) {
    super({ value: id ?? uuid() });
  }

  public get value(): string {
    return this.props.value;
  }

  public static create(
    props: UniqueEntityIDProps
  ): Either<Error, UniqueEntityID> {
    const isValid = Joi.string().uuid().validate(props.value).error === null;

    if (!isValid) {
      return left(new Error('UniqueEntityID is not valid'));
    }

    return right(new UniqueEntityID(props.value));
  }
}
