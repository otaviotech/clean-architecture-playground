import { IAuthTokenDecoder } from '@infra/authentication/ports';

export class AuthTokenDecoderStub implements IAuthTokenDecoder {
  decode(token: string): Promise<{ [key: string]: number | string | null }> {
    return Promise.resolve({
      id: '5b8ad563-80db-47e9-b4f0-6cd6b3137e5b',
    });
  }
}
