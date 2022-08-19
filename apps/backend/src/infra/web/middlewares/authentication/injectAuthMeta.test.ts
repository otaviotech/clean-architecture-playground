import { IAuthTokenDecoder } from '@infra/authentication/ports';
import { IHttpMiddleware, IHttpRequest } from '@infra/web/ports';
import { IConfigManager } from '@infra/config/ports';

// Stubs
import { AuthTokenDecoderStub } from '@test/stubs/infra/authentication';
import { ConfigManagerStub } from '@test/stubs/infra/config';

// SUT
import { InjectAuthMetaMiddleware } from './injectAuthMeta';

describe('InjectAuthMetaMiddleware', () => {
  const makeSut = () => {
    const authTokenId = '5b8ad563-80db-47e9-b4f0-6cd6b3137e5b';
    const validAuthToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViOGFkNTYzLTgwZGItNDdlOS1iNGYwLTZjZDZiMzEzN2U1YiIsImlhdCI6MTY2MDg3MTk3NiwiZXhwIjoxNjYwODc1NTc2fQ.5nGPONN6BPdx2G9BSFnZHqrjuZ6J281lcbdG80D7ah8';

    const authTokenDecoderStub: IAuthTokenDecoder = new AuthTokenDecoderStub();
    const configManagerStub: IConfigManager = new ConfigManagerStub();
    const sut: IHttpMiddleware = new InjectAuthMetaMiddleware(
      authTokenDecoderStub,
      configManagerStub
    );

    return {
      sut,
      authTokenDecoderStub,
      configManagerStub,
      validAuthToken,
      authTokenId,
    };
  };

  it('should parse the auth token and inject it into the request meta', async () => {
    const {
      sut,
      validAuthToken,
      authTokenId,
      authTokenDecoderStub,
      configManagerStub,
    } = makeSut();

    const nextFn = jest.fn();

    jest
      .spyOn(authTokenDecoderStub, 'decode')
      .mockResolvedValueOnce({ id: authTokenId });

    jest.spyOn(configManagerStub, 'getSecret');

    const request: IHttpRequest = {
      method: 'GET',
      params: {},
      headers: { authorization: 'Bearer ' + validAuthToken },
      query: {},
    };

    await sut.use(request, { status: 200 }, nextFn);

    expect(request.meta?.userId).toEqual(authTokenId);

    expect(configManagerStub.getSecret).toHaveBeenCalledWith(
      'AUTH_TOKEN_SECRET'
    );

    expect(authTokenDecoderStub.decode).toHaveBeenCalledWith(
      validAuthToken,
      'SECRET'
    );

    expect(nextFn).toHaveBeenCalled();
  });
});
