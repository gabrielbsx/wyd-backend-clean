export interface Repository {
  findOne: (query?: any) => Promise<any>;
  findMany: (query: any, page: number, limit: number) => Promise<any[]>;
  create: (data: any) => Promise<any>;
  updateOne: (query: any, data: any) => Promise<any>;
  updateMany: (query: any, data: any) => Promise<any>;
  deleteOne: (query: any) => Promise<boolean>;
  deleteMany: (query: any) => Promise<boolean>;
}

