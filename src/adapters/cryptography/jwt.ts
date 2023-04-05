import { Tokenizer } from '@/ports/cryptography';
import { injectable } from 'inversify';
import jwt from 'jsonwebtoken';

@injectable()
export class JwtAdapter implements Tokenizer {
  async sign(data: any, secret: string, options?: any): Promise<string> {
    const token = jwt.sign(data, secret, options);
    return token;
  }
  async verify(token: string, secret: string): Promise<any> {
    const data = jwt.verify(token, secret);
    return data;
  }
}

