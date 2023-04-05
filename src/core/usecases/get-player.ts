import { Repository, UseCase, HttpResponse, HttpRequest, badRequest, ok } from '@/ports/common';
import { inject, injectable } from 'inversify';

@injectable()
export class GetPlayerUseCase implements UseCase {
  constructor(
    @inject('PlayerRepository') private readonly playerRepository: Repository,
  ) { }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { params } = httpRequest;
    const playerId = params?.id;
    if (!playerId) {
      return badRequest(new Error('Missing param: id'));
    }
    const player = await this.playerRepository.findOne(playerId);
    return ok(player);
  }
}

