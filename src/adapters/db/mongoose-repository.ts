import { Model, FilterQuery } from 'mongoose';
import { Repository } from '@/ports/common';
import { injectable } from 'inversify';

type Doc<T> = T & { _id: string };

function mongoIdConverterHelper(query: any) {
  const { id, ...queryWithoutId } = query as any;
  const queryWithMongoId = {
    ...queryWithoutId,
    _id: id,
  };
  if (queryWithMongoId._id === undefined) {
    delete queryWithMongoId._id;
  }
  return queryWithMongoId;
}

@injectable()
export class MongooseRepository<T> implements Repository {
  constructor(
    private readonly model: Model<T>,
  ) { }
  async findOne(query?: FilterQuery<T>): Promise<Omit<Doc<T>, '_id'> | null> {
    const queryConverted = mongoIdConverterHelper(query);
    const document = await this.model.findOne(queryConverted).lean<Doc<T>>();
    if (!document) {
      return null;
    }
    const { _id, ...documentWithoutMongoId } = document;
    return {
      id: _id,
      ...documentWithoutMongoId,
    };
  }
  async findMany(query: FilterQuery<T>, page: number, limit: number): Promise<Omit<Doc<T>, '_id'>[]> {
    const skip = (page - 1) * limit;
    const queryConverted = mongoIdConverterHelper(query);
    const documents = await this.model.find(queryConverted).skip(skip).limit(limit).lean<Doc<T>[]>();
    const documentsWithoutUnderscoredId = documents.map((document) => {
      const { _id, ...documentWithoutMongoId } = document;
      return {
        id: _id,
        ...documentWithoutMongoId,
      };
    });
    return documentsWithoutUnderscoredId;
  }
  async create(data: Omit<T, 'id' | '_id'>) {
    const document = await this.model.create(data);
    const { _id, ...documentWithoutMongoId } = document.toObject();
    return {
      ...documentWithoutMongoId,
      id: _id,
    };
  }
  async updateOne(query: FilterQuery<T>, data: Partial<T>) {
    const queryConverted = mongoIdConverterHelper(query);
    const document = await this.model.findOneAndUpdate(queryConverted, data);
    return document?.toObject();
  }
  async updateMany(query: FilterQuery<T>, data: Partial<T>) {
    const queryConverted = mongoIdConverterHelper(query);
    const documents = await this.model.updateMany(queryConverted, data);
    return documents.upsertedId;
  }
  async deleteOne(query: FilterQuery<T>): Promise<boolean> {
    const queryConverted = mongoIdConverterHelper(query);
    const document = await this.model.findOneAndDelete(queryConverted);
    return Boolean(document);
  }
  async deleteMany(query: FilterQuery<T>): Promise<boolean> {
    const queryConverted = mongoIdConverterHelper(query);
    const documents = await this.model.deleteMany(queryConverted);
    return Boolean(documents);
  }
}

