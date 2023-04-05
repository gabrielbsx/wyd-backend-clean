export interface Tokenizer {
  sign: (data: any, secret: string, options?: any) => Promise<string>;
  verify: (token: string, secret: string) => Promise<any>;
}

