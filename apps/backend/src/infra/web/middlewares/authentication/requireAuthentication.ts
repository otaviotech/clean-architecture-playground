import { Either, left, right } from 'fp-ts/lib/Either';
import { inject, singleton } from 'tsyringe';

import { IValidateAuthTokenService } from '@application/ports/services';
import { InvalidCredentialsError } from '@application/errors';

import { HttpRequest, HttpResponse, HttpMiddleware } from '@infra/ports';
import { buildUnauthorizedResponse } from '@infra/web/shared';

@singleton()
export class RequireAuthenticationMiddleware implements HttpMiddleware {
  constructor(
    @inject('IValidateAuthTokenService')
    private readonly validateAuthTokenService: IValidateAuthTokenService
  ) {}

  async use(
    req: HttpRequest,
    res: HttpResponse,
    next: () => void
  ): Promise<Either<HttpResponse, void>> {
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

  private extractAuthToken(req: HttpRequest): string {
    return req.headers.authorization?.split(' ')?.[1] ?? '';
  }
}
