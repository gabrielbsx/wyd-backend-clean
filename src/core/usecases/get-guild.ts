import { Repository, UseCase, HttpResponse, HttpRequest, badRequest, ok } from '@/ports/common';
import { inject, injectable } from 'inversify';

@injectable()
export class GetGuildUseCase implements UseCase {
  constructor(
    @inject('GuildRepository') private readonly guildRepository: Repository,
  ) { }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { params } = httpRequest;
    const guildId = params?.id;
    if (!guildId) {
      return badRequest(new Error('Missing param: id'));
    }
    const guild = await this.guildRepository.findOne(guildId);
    return ok(guild);
  }
}

