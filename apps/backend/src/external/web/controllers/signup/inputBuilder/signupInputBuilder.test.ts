import { isLeft, isRight } from 'fp-ts/Either';
import { SignUpUseCaseInput } from '@application/ports/usecases';
import { VanillaSignUpInputBuilder } from './vanillaSignUpInputBuilder';

const implementations = [VanillaSignUpInputBuilder].map((klass) => ({
  name: klass.name,
  Implementation: klass,
}));

describe.each(implementations)(
  '[SignUpInputBuilder] [$name]',
  ({ Implementation }) => {
    const sut = new Implementation();

    it('should accept a valid input ', () => {
      const input: SignUpUseCaseInput = {
        email: 'johndoe@email.com',
        username: 'johndoe',
        password: 'abc123',
      };

      const result = sut.build(input);

      if (isLeft(result)) {
        throw new Error('should have accepted a valid input');
      }

      expect(result.right).toEqual({
        email: 'johndoe@email.com',
        username: 'johndoe',
        password: 'abc123',
      });
    });

    it('should require email', () => {
      const input: Partial<SignUpUseCaseInput> = {
        username: 'johndoe',
        password: 'abc123',
      };

      const result = sut.build(input as SignUpUseCaseInput);

      if (isRight(result)) {
        throw new Error('Should have returned an error');
      }

      expect(result.left).toHaveLength(1);
      expect(result.left[0].message).toBe('field email is required');
    });

    it('should require username', () => {
      const input: Partial<SignUpUseCaseInput> = {
        email: 'johndoe@email.com',
        password: 'abc123',
      };

      const result = sut.build(input as SignUpUseCaseInput);
      if (isRight(result)) {
        throw new Error('Should have returned an error');
      }

      expect(result.left).toHaveLength(1);
      expect(result.left[0].message).toBe('field username is required');
    });

    it('should require password', () => {
      const input: Partial<SignUpUseCaseInput> = {
        email: 'johndoe@email.com',
        username: 'johndoe',
      };

      const result = sut.build(input as SignUpUseCaseInput);
      if (isRight(result)) {
        throw new Error('Should have returned an error');
      }

      expect(result.left).toHaveLength(1);
      expect(result.left[0].message).toBe('field password is required');
    });
  }
);
