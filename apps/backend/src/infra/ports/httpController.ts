import { HttpRequest } from './httpRequest';
import { HttpResponse } from './httpResponse';

export interface HttpController {
  handle(input: HttpRequest): Promise<HttpResponse>;
}
