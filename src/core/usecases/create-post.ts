import { HttpRequest, HttpResponse, Repository, UseCase, created, badRequest, RequestFile } from '@/ports/common';
import { Slugify } from '@/ports/generic-libs';
import { Storage } from '@/ports/storage';
import { Post } from '@/core/domain/entities';
import { mimetypeToExtension } from '@/core/helpers';
import { randomUUID } from 'node:crypto';
import { inject, injectable } from 'inversify';
import { Validator } from '@/ports/common';

type CreatePostRequest = Omit<Post, 'id' | 'slug' | 'createdAt' | 'updatedAt'> & { tags: string, thumbnail: RequestFile[] };

@injectable()
export class CreatePostUseCase implements UseCase {
  constructor(
    @inject('PostRepository') private readonly postRepository: Repository,
    @inject('Slugify') private readonly slugify: Slugify,
    @inject('StorageFileSystem') private readonly storage: Storage,
    @inject('ValidateCreatePost') private readonly validateCreatePost: Validator,
  ) {
  }
  async handle(httpRequest: HttpRequest<CreatePostRequest>): Promise<HttpResponse<Post>> {
    const { body } = httpRequest;
    const bodyParsedOrError = this.validateCreatePost.validate(body);
    if (bodyParsedOrError instanceof Error) {
      return badRequest(bodyParsedOrError);
    }
    const { thumbnail, title, ...bodyParsed } = bodyParsedOrError;
    const thumbnailFolder = process.env.UPLOAD_FOLDER + '/posts';
    const thumbnailFileNameOrError = await this.storage.write(thumbnailFolder, thumbnail[0]);
    if (thumbnailFileNameOrError instanceof Error) {
      return badRequest(thumbnailFileNameOrError);
    }
    const thumbnailFileName = thumbnailFileNameOrError;
    const slug = this.slugify.slugify(`${title}-${randomUUID()}`, { strict: true });
    const postCreated = await this.postRepository.create({
      ...bodyParsed,
      title,
      slug,
      thumbnail: thumbnailFileName,
    });
    return created(postCreated);
  }
}

