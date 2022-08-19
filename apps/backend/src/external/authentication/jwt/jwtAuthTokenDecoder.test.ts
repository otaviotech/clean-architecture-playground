import { JwtAuthTokenDecoder } from './jwtAuthTokenDecoder';

describe('JwtAuthTokenDecoder', () => {
  it('should decode a valid token', async () => {
    const sut = new JwtAuthTokenDecoder();
    const authTokenId = '5b8ad563-80db-47e9-b4f0-6cd6b3137e5b';
    const validAuthToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViOGFkNTYzLTgwZGItNDdlOS1iNGYwLTZjZDZiMzEzN2U1YiIsImlhdCI6MTY2MDg3NDY5OCwiZXhwIjo4NjU2NjA3ODgyOTh9.VVtOXY2xcEEq_d5lZL6uU7eXD4eGqW2Mlk6Wpl6Qdcc';

    const result = await sut.decode(validAuthToken, 'SECRET');

    expect(result).toMatchObject({ id: authTokenId });
  });
});
