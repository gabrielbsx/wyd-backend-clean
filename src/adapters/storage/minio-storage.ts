import { RequestFile } from '@/ports/common';
import { Storage } from '@/ports/storage';
import { injectable } from 'inversify';
import { MinioClient } from './minio-client';
import { randomUUID } from 'node:crypto';

@injectable()
export class MinioStorageAdapter implements Storage {
  async write(folder: string, stream: RequestFile) {
    const bucketName = folder;
    const objectName = randomUUID();
    const bucketExists = await MinioClient.client.bucketExists(bucketName);
    if (!bucketExists) {
      return new Error('Bucket does not exist');
    }
    const streamUploaded = await MinioClient.client.putObject(bucketName, objectName, stream.data);
    if (!streamUploaded) {
      return new Error('Failed to upload stream');
    }
    return objectName;
  }
}

