import { HttpRequest, HttpResponse, Repository, UseCase, ok } from '@/ports/common';
import { inject, injectable } from 'inversify';
import R from 'ramda';

@injectable()
export class GetManyPostsUseCase implements UseCase {
  constructor(
    @inject('PostRepository') private readonly postRepository: Repository,
  ) { }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { page, limit, ...restQuery } = httpRequest.query;
    const queryWithoutEmptyValues = R.pickBy(R.identity, restQuery);
    const posts = await this.postRepository.findMany(queryWithoutEmptyValues, page ?? 1, limit ?? 10);
    return ok(posts);
  }
}

