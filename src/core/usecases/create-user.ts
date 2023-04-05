import { HttpRequest, HttpResponse, UseCase, Repository, created, badRequest } from '@/ports/common';
import { User } from '@/core/domain/entities';
import { Cryptography } from '@/ports/cryptography';
import { inject, injectable } from 'inversify';
import { Validator } from '@/ports/common';

type CreateUserResponse = Omit<User, 'password' | 'role' | 'players' | 'orders'>;
type CreateUserRequest = Omit<User, 'id' | 'role' | 'players'> & { passwordConfirmation: string };

@injectable()
export class CreateUserUseCase implements UseCase {
  constructor(
    @inject('UserRepository') private readonly userRepository: Repository,
    @inject('CryptographyBcrypt') private readonly cryptography: Cryptography,
    @inject('ValidateCreateUser') private readonly validateCreateUser: Validator,
  ) { }
  async handle(httpRequest: HttpRequest<CreateUserRequest>): Promise<HttpResponse<CreateUserResponse>> {
    const { body } = httpRequest;
    const bodyParsedOrError = this.validateCreateUser.validate(body);
    if (bodyParsedOrError instanceof Error) {
      return badRequest(bodyParsedOrError);
    }
    const { passwordConfirmation, password, username, ...restOfBodyParsed } = bodyParsedOrError;
    const isUsernameExists = await this.userRepository.findOne({ username });
    if (isUsernameExists) {
      return badRequest(new Error('Username already exists'));
    }
    const passwordHashed = await this.cryptography.hash(password);
    const userCreated = await this.userRepository.create({
      ...restOfBodyParsed,
      username,
      password: passwordHashed,
    });
    const { password: _, role, players, orders, ...userWithoutSensitiveData } = userCreated;
    return created<CreateUserResponse>(userWithoutSensitiveData);
  }
}

