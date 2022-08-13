import { Either } from 'fp-ts/lib/Either';
import { HttpRequest, HttpResponse } from '@infra/ports';

export interface HttpMiddleware {
  use(
    req: HttpRequest,
    res: HttpResponse,
    next: () => void
  ): Promise<Either<HttpResponse, void>>;
}
