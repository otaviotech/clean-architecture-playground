import { IHttpRequest } from './httpRequest';
import { IHttpResponse } from './httpResponse';

export interface IHttpController {
  handle(input: IHttpRequest): Promise<IHttpResponse>;
}
