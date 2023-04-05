import { Cryptography } from '@/ports/cryptography'
import bcrypt from 'bcrypt';
import { injectable } from 'inversify';

@injectable()
export class BcryptAdapter implements Cryptography {
  async hash(value: string) {
    return await bcrypt.hash(value, await bcrypt.genSalt());
  }
  async compare(value: string, hash: string) {
    return await bcrypt.compare(value, hash);
  }
}

