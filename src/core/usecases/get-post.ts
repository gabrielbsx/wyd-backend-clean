import { Repository, UseCase, HttpResponse, HttpRequest, badRequest, ok } from '@/ports/common';
import { inject, injectable } from 'inversify';

@injectable()
export class GetPostUseCase implements UseCase {
  constructor(
    @inject('PostRepository') private readonly postRepository: Repository,
  ) { }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { params } = httpRequest;
    const postId = params?.id;
    if (!postId) {
      return badRequest(new Error('Missing param: id'));
    }
    const post = await this.postRepository.findOne(postId);
    return ok(post);
  }
}

