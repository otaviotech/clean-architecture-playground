import { Entity } from '@domain/shared';
import { Email, UniqueEntityID, Username } from '@domain/valueObjects';
import { Either, isLeft, left, right } from 'fp-ts/lib/Either';

export interface ProfilePlainProps {
  id?: string;
  username: string;
  email: string;
  password: string;
}

export interface ProfileProps {
  id?: UniqueEntityID;
  username: Username;
  email: Email;
  password: string;
}

export class Profile extends Entity<ProfileProps> {
  get email(): Email {
    return this.props.email;
  }

  get username(): Username {
    return this.props.username;
  }

  get password(): string {
    return this.props.password;
  }

  static create(props: ProfilePlainProps): Either<Error, Profile> {
    const id = props.id
      ? UniqueEntityID.create({ value: props.id })
      : right(undefined);

    if (isLeft(id)) {
      return left(id.left);
    }

    const email = Email.create(props.email);

    if (isLeft(email)) {
      return left(email.left);
    }

    const username = Username.create(props.username);

    if (isLeft(username)) {
      return left(username.left);
    }

    const profile = new Profile({
      id: id.right,
      username: username.right,
      email: email.right,
      password: props.password,
    });

    return right(profile);
  }
}
