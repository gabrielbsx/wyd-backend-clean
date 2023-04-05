import { Validator } from '@/ports/common';
import { injectable } from 'inversify';
import z from 'zod';

@injectable()
export class ValidateCreateUser implements Validator {
  validate(input: any) {
    const schema = z.object({
      name: z.string().optional(),
      username: z.string().min(4).max(12).regex(/^[a-zA-Z0-9]+$/),
      email: z.string().email(),
      password: z.string().min(4).max(12).regex(/^[a-zA-Z0-9]+$/),
      passwordConfirmation: z.string().min(4).max(12).regex(/^[a-zA-Z0-9]+$/),
    });
    if (input.password !== input.passwordConfirmation) {
      return new Error('Password confirmation does not match');
    }
    const result = schema.safeParse(input);
    if (!result.success) {
      const messages = result.error.issues.map(issue => issue.message).join(', ');
      return new Error(messages);
    }
    return result.data;
  }
}

