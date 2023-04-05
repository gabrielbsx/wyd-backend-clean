import * as Minio from 'minio';

export class MinioClient {
  static client: Minio.Client
  connect = () => {
    if (!MinioClient.client) {
      const client = new Minio.Client({
        endPoint: String(process.env.MINIO_HOST),
        port: Number(process.env.MINIO_PORT),
        accessKey: String(process.env.MINIO_ACCESS_KEY),
        secretKey: String(process.env.MINIO_SECRET_KEY),
        useSSL: false,
      });
      MinioClient.client = client;
    }
  }
}

