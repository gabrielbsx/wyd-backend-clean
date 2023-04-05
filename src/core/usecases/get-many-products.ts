import { HttpRequest, HttpResponse, Repository, UseCase, ok } from '@/ports/common';
import { Cache } from '@/ports/db';
import { inject, injectable } from 'inversify';
import R from 'ramda';

@injectable()
export class GetManyProductsUseCase implements UseCase {
  constructor(
    @inject('ProductRepository') private readonly productRepository: Repository,
  ) { }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { page, limit, order, ...restQuery } = httpRequest.query;
    const queryWithoutEmptyValues = R.pickBy(R.identity, restQuery);
    const products = await this.productRepository.findMany(queryWithoutEmptyValues, page ?? 1, limit ?? 10);
    return ok(products);
  }
}
