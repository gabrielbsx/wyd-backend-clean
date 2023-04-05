import { Cache } from '@/ports/db';
import { injectable } from 'inversify';

@injectable()
export class RedisCache implements Cache {
  private readonly client: any;
  constructor(client: any) {
    this.client = client;
  }
  async set(key: string, value: any): Promise<void> {
    await this.client.set(key, JSON.stringify(value));
  }
  async get(key: string): Promise<any> {
    const data = await this.client.get(key);
    if (!data) {
      return null;
    }
    return JSON.parse(data);
  }
  async delete(key: string): Promise<void> {
    await this.client.del(key);
  }
}

