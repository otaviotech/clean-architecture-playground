import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';

import { HttpController, HttpRequest, Logger } from '@infra/ports';

export class ExpressRouteAdapter {
  constructor(private readonly logger: Logger) {}

  adapt(
    controller: HttpController
  ): (req: ExpressRequest, res: ExpressResponse) => Promise<unknown> {
    return async (req: ExpressRequest, res: ExpressResponse) => {
      const httpRequest: HttpRequest = {
        method: req.method,
        params: req.params,
        query: req.query,
        headers: req.headers,
        body: req.body,
      };

      try {
        const response = await controller.handle(httpRequest);
        return res.status(response.status).json(response.body);
      } catch (error) {
        this.logger.error(error);
        return res.status(500).json({ data: 'Internal Server Error' });
      }
    };
  }
}
