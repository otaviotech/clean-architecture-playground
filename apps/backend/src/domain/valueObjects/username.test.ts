import { isLeft, isRight } from 'fp-ts/lib/Either';
import { InvalidUsernameError } from '../errors';
import { Username } from './username';

describe('[ValueObject] Username', () => {
  it('should accept only lowercase letters, numbers, dots and underscores', () => {
    const validUsername = 'valid123._';

    const result = Username.create(validUsername);

    if (isLeft(result)) {
      throw new Error('Username should be valid');
    }

    expect(result.right.value).toBe(validUsername);
  });

  it('should not accept anything but lowercase letters, numbers, dots and underscores', () => {
    const invalidUsername = 'invalid!@#$%^&*()_';
    const result = Username.create(invalidUsername);

    if (isRight(result)) {
      throw new Error('Username should not be valid');
    }

    expect(result.left).toEqual(new InvalidUsernameError(invalidUsername));
  });
});
