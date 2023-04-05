import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

export class MongooseConnection {
  static connection: mongoose.Connection;
  getCollection(collectionName: string) {
    if (this.isConnect()) {
      return MongooseConnection.connection.collection(collectionName);
    }
    throw new Error('Database not connected');
  }
  async connect(): Promise<void> {
    const mongoUri = process.env.MONGO_URI as string || (new MongoMemoryServer()).getUri();
    const mongo = await mongoose.connect(mongoUri);
    MongooseConnection.connection = mongo.connection;
  }
  isConnect = (): boolean => Boolean(MongooseConnection.connection);
  disconnect = (): Promise<void> => MongooseConnection.connection.close();
}

