import { HttpRequest, HttpResponse, Middleware, ok, Repository } from '@/ports/common';
import { inject, injectable } from 'inversify';

@injectable()
export class AdminMiddleware implements Middleware {
  constructor(
    @inject('UserRepository') private readonly userRepository: Repository,
  ) { }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { user } = httpRequest;
    return ok(null);
  }
}

