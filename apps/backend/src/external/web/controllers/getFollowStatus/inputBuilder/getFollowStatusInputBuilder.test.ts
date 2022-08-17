import { isRight } from 'fp-ts/Either';
import { VanillaGetFollowStatusInputBuilder } from './vanillaGetFollowStatusInputBuilder';

const implementations = [VanillaGetFollowStatusInputBuilder].map((klass) => ({
  name: klass.name,
  Implementation: klass,
}));

describe.each(implementations)(
  '[GetFollowStatusInputBuilder] [$name]',
  ({ Implementation }) => {
    const sut = new Implementation();

    it('should accept a valid input ', () => {
      const input = {
        followedId: 'any_id',
        followerId: 'any_id',
      };

      const result = sut.build(input);
      expect(isRight(result)).toBe(true);
    });

    it('should require followedId', () => {
      const input = {
        followedId: '',
        followerId: 'any_id',
      };

      const result = sut.build(input);
      expect(isRight(result)).toBe(false);
    });

    it('should require followerId', () => {
      const input = {
        followedId: 'any_id',
        followerId: '',
      };

      const result = sut.build(input);
      expect(isRight(result)).toBe(false);
    });
  }
);
