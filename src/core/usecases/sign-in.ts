import { Cryptography, Tokenizer } from '@/ports/cryptography';
import { HttpRequest, HttpResponse, Repository, UseCase, ok, unauthorized, badRequest } from '@/ports/common';
import { User } from '@/core/domain/entities';
import { Cache } from '@/ports/db';
import { isValidUsername, isValidPassword, timeGenerator, Timer } from '@/core/helpers';
import { inject, injectable } from 'inversify';

type SignInRequest = {
  username: string;
  password: string;
};

type SignInResponse = {
  token: string;
  user: Omit<User, 'password'>;
}

@injectable()
export class SignInUseCase implements UseCase {
  constructor(
    @inject('UserRepository') private readonly userRepository: Repository,
    @inject('CryptographyBcrypt') private readonly cryptography: Cryptography,
    @inject('TokenizerJwt') private readonly tokenizer: Tokenizer,
    @inject('CacheRedis') private readonly cache: Cache,
  ) { }
  async handle(httpRequest: HttpRequest<SignInRequest>): Promise<HttpResponse<SignInResponse>> {
    const { body } = httpRequest;
    if (!body) {
      return badRequest(new Error('Missing request body'));
    }
    const requiredFields: (keyof SignInRequest)[] = ['username', 'password'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return badRequest(new Error(`Missing field: ${field}`));
      }
    }
    const { username, password } = body;
    if (!isValidUsername(username)) {
      return badRequest(new Error('Invalid username'));
    }
    if (!isValidPassword(password)) {
      return badRequest(new Error('Invalid password'));
    }
    const isUsernameExists = await this.userRepository.findOne({ username });
    if (!isUsernameExists) {
      return unauthorized(new Error('Invalid username or password'));
    }
    const { password: passwordHashed, ...userWithoutPassword } = isUsernameExists;
    const isSamePassword = await this.cryptography.compare(password, passwordHashed);
    if (!isSamePassword) {
      return unauthorized(new Error('Invalid username or password'));
    }
    const jwtSecret = process.env.JWT_SECRET as string;
    const expiresIn = timeGenerator(1, Timer.HOUR);
    const token = await this.tokenizer.sign(
      { id: userWithoutPassword.id },
      jwtSecret,
      { expiresIn },
    );
    const { id, name, email, role, donation } = userWithoutPassword;
    const userToSaveOnCache = Object.assign({}, { id, name, username, email, role, donation });
    await this.cache.set(token, {
      user: userToSaveOnCache,
      signAt: new Date(),
      tokenExpiresAt: new Date(Date.now() + expiresIn),
      token: token,
    });
    return ok<SignInResponse>({
      token,
      user: userWithoutPassword,
    });
  }
}

