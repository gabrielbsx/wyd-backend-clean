import { HttpRequest, HttpResponse, Repository, UseCase, ok } from '@/ports/common';
import { inject, injectable } from 'inversify';
import R from 'ramda';

@injectable()
export class GetManyPlayersUseCase implements UseCase {
  constructor(
    @inject('PlayerRepository') private readonly playerRepository: Repository,
  ) { }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { page, limit, order, ...restQuery } = httpRequest.query;
    const queryWithoutEmptyValues = R.pickBy(R.identity, restQuery);
    const players = await this.playerRepository.findMany(queryWithoutEmptyValues, page ?? 1, limit ?? 10);
    return ok(players);
  }
}
