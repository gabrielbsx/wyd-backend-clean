import { RequestFile } from '../common';

export interface Storage {
  write(folder: string, file: RequestFile): Promise<string | Error>;
}

