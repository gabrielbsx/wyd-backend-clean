import { Repository, UseCase, HttpResponse, HttpRequest, badRequest, ok } from '@/ports/common';
import { Storage } from '@/ports/storage';
import { randomUUID } from 'node:crypto';
import { inject, injectable } from 'inversify';
import { Validator } from '@/ports/common';
import { Slugify } from '@/ports/generic-libs';

@injectable()
export class UpdatePostUseCase implements UseCase {
  constructor(
    @inject('PostRepository') private readonly postRepository: Repository,
    @inject('StorageFileSystem') private readonly storage: Storage,
    @inject('Slugify') private readonly slugify: Slugify,
    @inject('ValidateUpdatePost') private readonly validateUpdatePost: Validator,
  ) { }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { params, body } = httpRequest;
    const postId = params?.id;
    if (!postId) {
      return badRequest(new Error('Missing param: id'));
    }
    const bodyParsedOrError = this.validateUpdatePost.validate(body);
    if (bodyParsedOrError instanceof Error) {
      return badRequest(bodyParsedOrError);
    }
    const postExists = await this.postRepository.findOne(postId);
    if (!postExists) {
      return badRequest(new Error('Post not found'));
    }
    const { title, thumbnail } = body;
    if (thumbnail) {
      const thumbnailFolder = process.env.UPLOAD_FOLDER + '/posts';
      const thumbnailFileNameOrError = await this.storage.write(thumbnailFolder, thumbnail[0]);
      if (thumbnailFileNameOrError instanceof Error) {
        return badRequest(thumbnailFileNameOrError);
      }
      const thumbnailFileName = thumbnailFileNameOrError;
      body.thumbnail = thumbnailFileName;
    }
    if (title) {
      const slug = this.slugify.slugify(`${title}-${randomUUID()}`, { strict: true });
      body.slug = slug;
    }
    const post = await this.postRepository.updateOne(postId, body);
    return ok(post);
  }
}

