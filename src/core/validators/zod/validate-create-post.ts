import { Validator } from '@/ports/common';
import { z } from 'zod';

export class ValidateCreatePost implements Validator {
  validate(input: any) {
    const schema = z.object({
      title: z.string(),
      content: z.string(),
      excerpt: z.string(),
      category: z.string(),
      tags: z.array(z.string()),
      published: z.boolean(),
      thumbnail: z.array(z.object({
        data: z.any(),
        mimetype: z.string().regex(/image\/(png|jpeg|jpg)/),
        encoding: z.string(),
        filename: z.string(),
        limit: z.boolean(),
      })).nonempty().length(1),
    }).strict();
    const result = schema.safeParse(input);
    if (!result.success) {
      const messages = result.error.issues.map(issue => issue.message).join(', ');
      return new Error(messages);
    }
    return result.data;
  }
}

