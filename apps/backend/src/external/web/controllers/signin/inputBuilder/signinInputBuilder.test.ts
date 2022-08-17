import { isRight } from 'fp-ts/Either';
import { VanillaSignInInputBuilder } from './vanillaSignInInputBuilder';

const implementations = [VanillaSignInInputBuilder].map((klass) => ({
  name: klass.name,
  Implementation: klass,
}));

describe.each(implementations)(
  '[SignInInputBuilder] [$name]',
  ({ Implementation }) => {
    const sut = new Implementation();

    it('should accept a valid input ', () => {
      const input = {
        username: 'johndoe',
        password: '1234567',
      };

      const result = sut.build(input);
      expect(isRight(result)).toBe(true);
    });

    it('should require username', () => {
      const input = {
        username: '',
        password: '1234567',
      };

      const result = sut.build(input);
      expect(isRight(result)).toBe(false);
    });

    it('should require password', () => {
      const input = {
        username: 'johndoe',
        password: '',
      };

      const result = sut.build(input);
      expect(isRight(result)).toBe(false);
    });
  }
);
