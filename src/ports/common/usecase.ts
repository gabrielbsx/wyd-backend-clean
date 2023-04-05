import { HttpRequest, HttpResponse } from './http';

export interface UseCase {
  handle(request: HttpRequest): Promise<HttpResponse>;
}

