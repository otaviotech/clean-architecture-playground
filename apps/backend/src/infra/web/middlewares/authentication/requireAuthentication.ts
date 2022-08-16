import { Either, left, right } from 'fp-ts/lib/Either';
import { inject, singleton } from 'tsyringe';

import { IValidateAuthTokenService } from '@application/ports/services';
import { InvalidCredentialsError } from '@application/errors';

import { IHttpRequest, IHttpResponse, IHttpMiddleware } from '@infra/web/ports';
import { buildUnauthorizedResponse } from '@infra/web/shared';

@singleton()
export class RequireAuthenticationMiddleware implements IHttpMiddleware {
  constructor(
    @inject('IValidateAuthTokenService')
    private readonly validateAuthTokenService: IValidateAuthTokenService
  ) {}

  async use(
    req: IHttpRequest,
    res: IHttpResponse,
    next: () => void
  ): Promise<Either<IHttpResponse, void>> {
    const authToken = this.extractAuthToken(req);
    const tokenIsValid = await this.validateAuthTokenService.execute(authToken);

    if (!tokenIsValid) {
      const response = buildUnauthorizedResponse([
        new InvalidCredentialsError(),
      ]);

      return left(response);
    }

    next();

    return right(undefined);
  }

  private extractAuthToken(req: IHttpRequest): string {
    return req.headers.authorization?.split(' ')?.[1] ?? '';
  }
}
