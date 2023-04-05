import { createClient } from 'redis';

export class RedisConnection {
  static connection: any;
  getConnection() {
    return RedisConnection.connection;
  }
  async connect(): Promise<void> {
    const redisUri = process.env.REDIS_URI as string;
    const redisClient = createClient({
      url: redisUri,
    });
    await redisClient.connect();
    RedisConnection.connection = redisClient;
  }
  isConnect = (): boolean => Boolean(RedisConnection.connection);
  disconnect = (): Promise<void> => RedisConnection.connection.disconnect();
}
