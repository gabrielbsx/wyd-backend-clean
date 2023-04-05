import { HttpRequest, HttpResponse, Repository, UseCase, ok } from '@/ports/common';
import { inject, injectable } from 'inversify';
import R from 'ramda';

@injectable()
export class GetManyGuildsUseCase implements UseCase {
  constructor(
    @inject('GuildRepository') private readonly guildRepository: Repository,
  ) { }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { page, limit, order, ...restQuery } = httpRequest.query;
    const queryWithoutEmptyValues = R.pickBy(R.identity, restQuery);
    const guilds = await this.guildRepository.findMany(queryWithoutEmptyValues, page ?? 1, limit ?? 10);
    return ok(guilds);
  }
}
