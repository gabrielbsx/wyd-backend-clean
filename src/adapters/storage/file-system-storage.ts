import { mimetypeToExtension } from '@/core/helpers';
import { RequestFile } from '@/ports/common';
import { Storage } from '@/ports/storage';
import { injectable } from 'inversify';
import { randomUUID } from 'node:crypto';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

@injectable()
export class FileSystemStorageAdapter implements Storage {
  async write(folder: string, file: RequestFile) {
    try {
      const buffer = file.data;
      const mimetype = file.mimetype;
      const fileName = `${randomUUID()}.${mimetypeToExtension(mimetype)}`;
      const filePath = join(__dirname, folder, fileName);
      writeFileSync(filePath, buffer);
      return fileName;
    } catch (error) {
      return new Error('Failed to write file');
    }
  }
}

