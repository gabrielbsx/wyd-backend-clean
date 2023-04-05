import { Container } from 'inversify';
import { Repository } from '@/ports/common';
import { MongooseRepository, RedisCache, RedisConnection } from '@/adapters/db';
import { Cryptography, Tokenizer } from '@/ports/cryptography';
import mongooseUserModel from '@/data/mongo/models/mongoose-user-model';
import mongooseGuildModel from '@/data/mongo/models/mongoose-guild-model';
import mongooseOrderModel from '@/data/mongo/models/mongoose-order-model';
import mongooseProductModel from '@/data/mongo/models/mongoose-product-model';
import mongoosePostModel from '@/data/mongo/models/mongoose-post-model';
import mongoosePlayerModel from '@/data/mongo/models/mongoose-player-model';
import { CreatePostUseCase, DeleteProductUseCase, GetManyPostsUseCase, SignInUseCase } from '@/core/usecases';
import { CreateUserUseCase } from '@/core/usecases';
import { CreateProductUseCase } from '@/core/usecases';
import { UpdatePostUseCase } from '@/core/usecases';
import { DeletePostUseCase } from '@/core/usecases';
import { BcryptAdapter, JwtAdapter } from '@/adapters/cryptography';
import { Slugify } from '@/ports/generic-libs';
import { SlugifyAdapter } from '@/adapters/generic-libs';
import { FileSystemStorageAdapter } from '@/adapters/storage';
import { Storage } from '@/ports/storage';
import { Cache } from '@/ports/db';
import { Validator } from '@/ports/common';
import {
  ValidateUpdatePost,
  ValidateCreatePost,
  ValidateCreateProduct,
  ValidateCreateUser,
  ValidateUpdateProduct,
} from '@/core/validators/zod';

export function setup() {
  const container = new Container();
  const redisConnection = new RedisConnection();

  container.bind<Repository>('UserRepository').toConstantValue(new MongooseRepository(mongooseUserModel));
  container.bind<Repository>('GuildRepository').toConstantValue(new MongooseRepository(mongooseGuildModel));
  container.bind<Repository>('OrderRepository').toConstantValue(new MongooseRepository(mongooseOrderModel));
  container.bind<Repository>('ProductRepository').toConstantValue(new MongooseRepository(mongooseProductModel));
  container.bind<Repository>('PostRepository').toConstantValue(new MongooseRepository(mongoosePostModel));
  container.bind<Repository>('PlayerRepository').toConstantValue(new MongooseRepository(mongoosePlayerModel));

  container.bind<Tokenizer>('TokenizerJwt').toConstantValue(new JwtAdapter());
  container.bind<Cryptography>('CryptographyBcrypt').toConstantValue(new BcryptAdapter());
  container.bind<Slugify>('Slugify').toConstantValue(new SlugifyAdapter());
  container.bind<Storage>('StorageFileSystem').toConstantValue(new FileSystemStorageAdapter());
  container.bind<Cache>('CacheRedis').toConstantValue(new RedisCache(redisConnection.getConnection()));

  container.bind<Validator>('ValidateCreateUser').toConstantValue(new ValidateCreateUser());
  container.bind<Validator>('ValidateCreatePost').toConstantValue(new ValidateCreatePost());
  container.bind<Validator>('ValidateCreateProduct').toConstantValue(new ValidateCreateProduct());
  container.bind<Validator>('ValidateUpdatePost').toConstantValue(new ValidateUpdatePost());
  container.bind<Validator>('ValidateUpdateProduct').toConstantValue(new ValidateUpdateProduct());

  container.bind<CreatePostUseCase>('CreatePostUseCase').to(CreatePostUseCase);
  container.bind<CreateUserUseCase>('CreateUserUseCase').to(CreateUserUseCase);
  container.bind<CreateProductUseCase>('CreateProductUseCase').to(CreateProductUseCase);
  container.bind<SignInUseCase>('SignInUseCase').to(SignInUseCase);

  container.bind<UpdatePostUseCase>('UpdatePostUseCase').to(UpdatePostUseCase);

  container.bind<DeletePostUseCase>('DeletePostUseCase').to(DeletePostUseCase);
  container.bind<DeleteProductUseCase>('DeleteProductUseCase').to(DeleteProductUseCase);

  container.bind<GetManyPostsUseCase>('GetManyPostsUseCase').to(GetManyPostsUseCase);

  return container;
}

