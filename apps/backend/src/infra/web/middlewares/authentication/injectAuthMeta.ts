import { Either, right } from 'fp-ts/lib/Either';
import { inject, singleton } from 'tsyringe';

import { IAuthTokenDecoder } from '@infra/authentication/ports';
import { IHttpMiddleware, IHttpRequest, IHttpResponse } from '@infra/web/ports';
import { IConfigManager } from '@infra/config/ports';

@singleton()
export class InjectAuthMetaMiddleware implements IHttpMiddleware {
  constructor(
    @inject('IAuthTokenDecoder')
    private readonly authTokenDecoder: IAuthTokenDecoder,
    @inject('IConfigManager')
    private readonly configManager: IConfigManager
  ) {}

  async use(
    req: IHttpRequest,
    res: IHttpResponse,
    next: () => void
  ): Promise<Either<IHttpResponse, void>> {
    const authTokenSecret = await this.configManager.getSecret(
      'AUTH_TOKEN_SECRET'
    );
    const token = this.extractAuthToken(req);
    const tokenData = await this.authTokenDecoder.decode(
      token,
      authTokenSecret
    );

    if (!req.meta) {
      req.meta = {};
    }

    req.meta.userId = tokenData.id.toString();

    next();

    return right(undefined);
  }

  private extractAuthToken(req: IHttpRequest): string {
    return req.headers.authorization?.split(' ')?.[1] ?? '';
  }
}
