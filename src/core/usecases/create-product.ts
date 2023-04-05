import { badRequest, created, HttpRequest, HttpResponse, Repository, RequestFile, UseCase } from '@/ports/common';
import { Slugify } from '@/ports/generic-libs';
import { Product } from '@/core/domain/entities';
import { Storage } from '@/ports/storage';
import { inject, injectable } from 'inversify';
import { Validator } from '@/ports/common';
import { randomUUID } from 'node:crypto';

type CreateProductRequest = Omit<Product, 'id' | 'slug' | 'createdAt' | 'updatedAt'> & { thumbnail: RequestFile[] };

@injectable()
export class CreateProductUseCase implements UseCase {
  constructor(
    @inject('ProductRepository') private readonly productRepository: Repository,
    @inject('Slugify') private readonly slugify: Slugify,
    @inject('StorageFileSystem') private readonly storage: Storage,
    @inject('ValidateCreateProduct') private readonly validateCreateProduct: Validator,
  ) { }
  async handle(httpRequest: HttpRequest<CreateProductRequest>): Promise<HttpResponse<Product>> {
    const { body } = httpRequest;
    const bodyParsedOrError = this.validateCreateProduct.validate(body);
    if (bodyParsedOrError instanceof Error) {
      return badRequest(bodyParsedOrError);
    }
    const { thumbnail, name, ...bodyParsed } = bodyParsedOrError;
    const thumbnailFolder = process.env.UPLOAD_FOLDER + '/products';
    const thumbnailFileNameOrError = await this.storage.write(thumbnailFolder, thumbnail[0]);
    if (thumbnailFileNameOrError instanceof Error) {
      return badRequest(thumbnailFileNameOrError);
    }
    const thumbnailFileName = thumbnailFileNameOrError;
    const slug = this.slugify.slugify(`${name}-${randomUUID()}`, { strict: true });
    const productCreated = await this.productRepository.create({
      ...bodyParsed,
      thumbnail: thumbnailFileName,
      name,
      slug,
    });
    return created(productCreated);
  }
}

