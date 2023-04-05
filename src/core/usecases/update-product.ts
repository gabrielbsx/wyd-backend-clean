import { badRequest, created, HttpRequest, HttpResponse, Repository, UseCase } from '@/ports/common';
import { Slugify } from '@/ports/generic-libs';
import { Product } from '@/core/domain/entities';
import { Storage } from '@/ports/storage';
import { inject, injectable } from 'inversify';
import { Validator } from '@/ports/common';
import { randomUUID } from 'node:crypto';

@injectable()
export class UpdateProductUseCase implements UseCase {
  constructor(
    @inject('ProductRepository') private readonly productRepository: Repository,
    @inject('Slugify') private readonly slugify: Slugify,
    @inject('StorageFileSystem') private readonly storage: Storage,
    @inject('ValidateCreateProduct') private readonly validateCreateProduct: Validator,
  ) { }
  async handle(httpRequest: HttpRequest<Partial<Product>>): Promise<HttpResponse<Product>> {
    const { params, body } = httpRequest;
    const bodyParsedOrError = this.validateCreateProduct.validate(body);
    if (bodyParsedOrError instanceof Error) {
      return badRequest(bodyParsedOrError);
    }
    const productId = params.id;
    const product = await this.productRepository.findOne(productId);
    if (!product) {
      return badRequest(new Error('Product not found'));
    }
    const { thumbnail, name, ...bodyParsed } = bodyParsedOrError;
    if (thumbnail) {
      const thumbnailFolder = process.env.UPLOAD_FOLDER + '/products';
      const thumbnailFileNameOrError = await this.storage.write(thumbnailFolder, thumbnail[0]);
      if (thumbnailFileNameOrError instanceof Error) {
        return badRequest(thumbnailFileNameOrError);
      }
      const thumbnailFileName = thumbnailFileNameOrError;
      bodyParsed.thumbnail = thumbnailFileName;
    }
    if (name) {
      const slug = this.slugify.slugify(`${name}-${randomUUID()}`, { strict: true });
      bodyParsed.slug = slug;
    }
    const productCreated = await this.productRepository.create({
      ...bodyParsed,
      name,
    });
    return created(productCreated);
  }
}

