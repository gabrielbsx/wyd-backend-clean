import { Repository, UseCase, HttpResponse, HttpRequest, badRequest, ok } from '@/ports/common';
import { inject, injectable } from 'inversify';

@injectable()
export class GetProductUseCase implements UseCase {
  constructor(
    @inject('ProductRepository') private readonly productRepository: Repository,
  ) { }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { params } = httpRequest;
    const productId = params?.id;
    if (!productId) {
      return badRequest(new Error('Missing param: id'));
    }
    const product = await this.productRepository.findOne(productId);
    return ok(product);
  }
}

