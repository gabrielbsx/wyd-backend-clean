import { HttpRequest, HttpResponse, Repository, UseCase, ok, badRequest } from '@/ports/common';
import { inject, injectable } from 'inversify';

@injectable()
export class DeleteProductUseCase implements UseCase {
  constructor(
    @inject('ProductRepository') private readonly productRepository: Repository,
  ) { }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { params } = httpRequest;
    const productId = params?.id;
    if (!productId) {
      return badRequest(new Error('Missing product id'));
    }
    const productDeleted = await this.productRepository.deleteOne({ id: productId });
    return ok(productDeleted);
  }
}

