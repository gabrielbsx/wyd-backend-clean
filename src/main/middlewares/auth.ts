import { HttpRequest, HttpResponse, Middleware, ok, Repository, unauthorized } from '@/ports/common';
import { Tokenizer } from '@/ports/cryptography';
import { inject, injectable } from 'inversify';

@injectable()
export class AuthMiddleware implements Middleware {
  constructor(
    @inject('UserRepository') private readonly userRepository: Repository,
    @inject('TokenizerBcrypt') private readonly tokenizer: Tokenizer,
  ) { }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { authorization } = httpRequest.headers;
    if (!authorization) {
      return unauthorized(new Error('Missing authorization header'));
    }
    const token = authorization.replace(/Bearer /i, '');
    const jwtSecret = process.env.JWT_SECRET as string;
    const tokenDecoded = await this.tokenizer.verify(token, jwtSecret);;
    if (!tokenDecoded) {
      return unauthorized(new Error('Invalid token'));
    }
    const { id } = tokenDecoded;
    const user = await this.userRepository.findOne({ id });
    return ok({ user });
  }
}

