import { Either } from 'fp-ts/lib/Either';
import { IHttpRequest, IHttpResponse } from '@infra/web/ports';

export interface IHttpMiddleware {
  use(
    req: IHttpRequest,
    res: IHttpResponse,
    next: () => void
  ): Promise<Either<IHttpResponse, void>>;
}
