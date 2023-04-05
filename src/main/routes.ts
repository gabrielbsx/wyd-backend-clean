import { FastifyInstance } from 'fastify';
import { adaptRoute } from '@/adapters/http/fastify-router';
import { setup } from './setup';
import { CreatePostUseCase, CreateProductUseCase, CreateUserUseCase, DeletePostUseCase, DeleteProductUseCase, GetManyPostsUseCase, UpdatePostUseCase } from '@/core/usecases';
import { createPostSchema, createProductSchema, createUserSchema, updatePostSchema } from '@/core/validators/schemas';

export const routerFastify = (app: FastifyInstance, opts: any, done: () => void) => {
  const container = setup();

  const createUserUseCase = container.get<CreateUserUseCase>('CreateUserUseCase');
  const createPostUseCase = container.get<CreatePostUseCase>('CreatePostUseCase');
  const createProductUseCase = container.get<CreateProductUseCase>('CreateProductUseCase');
  const signInUseCase = container.get<CreateProductUseCase>('SignInUseCase');
  const updatePostUseCase = container.get<UpdatePostUseCase>('UpdatePostUseCase');
  const deletePostUseCase = container.get<DeletePostUseCase>('DeletePostUseCase');
  const deleteProductUseCase = container.get<DeleteProductUseCase>('DeleteProductUseCase');
  const getManyPostsUseCase = container.get<GetManyPostsUseCase>('GetManyPostsUseCase');

  app.post('/signup', { schema: createUserSchema }, adaptRoute(createUserUseCase));
  app.post('/posts', { schema: createPostSchema }, adaptRoute(createPostUseCase));
  app.post('/products', { schema: createProductSchema }, adaptRoute(createProductUseCase));
  app.post('/signin', adaptRoute(signInUseCase));
  app.put('/posts/:id', { schema: updatePostSchema }, adaptRoute(updatePostUseCase));
  app.delete('/posts/:id', adaptRoute(deletePostUseCase));
  app.delete('/products/:id', adaptRoute(deleteProductUseCase));
  app.get('/posts', adaptRoute(getManyPostsUseCase));

  done();
}
