import { isLeft } from 'fp-ts/lib/Either';
import { singleton } from 'tsyringe';
import {
  Request as ExpressRequest,
  Response as ExpressResponse,
  NextFunction as ExpressNextFunction,
} from 'express';
import { HttpMiddleware, HttpRequest, HttpResponse } from '@infra/web/ports';

@singleton()
export class ExpressMiddlewareAdapter {
  adapt(middleware: HttpMiddleware) {
    return async (
      req: ExpressRequest,
      res: ExpressResponse,
      next: ExpressNextFunction
    ) => {
      const httpRequest: HttpRequest = {
        method: req.method,
        params: req.params,
        query: req.query,
        headers: req.headers,
        body: req.body,
      };

      const httpResponse: HttpResponse = {
        status: res.statusCode,
      };

      const nextFn = () => next();

      try {
        const result = await middleware.use(httpRequest, httpResponse, nextFn);

        if (isLeft(result)) {
          return res.status(result.left.status).json(result.left.body);
        }
      } catch (error) {
        console.error(error);
        return res.status(500).json({ data: 'Internal Server Error' });
      }
    };
  }
}
