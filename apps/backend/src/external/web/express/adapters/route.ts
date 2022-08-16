import { inject, singleton } from 'tsyringe';
import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';

import { IHttpController, IHttpRequest } from '@infra/web/ports';
import { ILogger } from '@infra/ports';

@singleton()
export class ExpressRouteAdapter {
  constructor(@inject('ILogger') private readonly logger: ILogger) {}

  adapt(
    controller: IHttpController
  ): (req: ExpressRequest, res: ExpressResponse) => Promise<unknown> {
    return async (req: ExpressRequest, res: ExpressResponse) => {
      const httpRequest: IHttpRequest = {
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
