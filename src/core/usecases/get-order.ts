import { Repository, UseCase, HttpResponse, HttpRequest, badRequest, ok } from '@/ports/common';
import { inject, injectable } from 'inversify';

@injectable()
export class GetOrderUseCase implements UseCase {
  constructor(
    @inject('OrderRepository') private readonly orderRepository: Repository,
  ) { }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { params } = httpRequest;
    const orderId = params?.id;
    if (!orderId) {
      return badRequest(new Error('Missing param: id'));
    }
    const order = await this.orderRepository.findOne(orderId);
    return ok(order);
  }
}

