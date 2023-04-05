export type HttpResponse<T = any> = {
  statusCode: number;
  data?: T;
}

export type HttpRequest<B = any, P = any, Q = any> = {
  body?: B;
  params?: P;
  query?: Q;
  files?: any;
  headers: any;
  user?: any;
}

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  data: { error: error.message },
});

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  data: { error: error.message },
});

export const ok = <T = any>(data: T): HttpResponse<T> => ({
  statusCode: 200,
  data,
});

export const created = <T = any>(data: T): HttpResponse<T> => ({
  statusCode: 201,
  data,
});

export const noContent = (): HttpResponse => ({
  statusCode: 204,
});

export const notFound = (error: Error): HttpResponse => ({
  statusCode: 404,
  data: { error: error.message },
});

export const unauthorized = (error: Error): HttpResponse => ({
  statusCode: 401,
  data: { error: error.message },
});

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  data: { error: error.message },
});

