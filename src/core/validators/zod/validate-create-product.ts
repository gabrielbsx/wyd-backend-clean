import { Validator } from '@/ports/common';
import { z } from 'zod';

export class ValidateCreateProduct implements Validator {
  validate(input: Object): any {
    const schema = z.object({
      name: z.string(),
      description: z.string(),
      thumbnail: z.array(z.object({
        data: z.any(),
        mimetype: z.string().regex(/image\/(png|jpeg|jpg)/),
        encoding: z.string(),
        filename: z.string(),
        limit: z.boolean(),
      })).nonempty().length(1),
      price: z.number(),
      donation: z.number(),
      hasDiscount: z.boolean(),
      priceWithoutDiscount: z.number().optional(),
      discountPricePercentage: z.number().optional(),
      donationWithoutDiscount: z.number().optional(),
      discountDonationPercentage: z.number().optional(),
      isActivated: z.boolean(),
    }).strict();
    const result = schema.safeParse(input);
    if (!result.success) {
      const messages = result.error.issues.map((issue) => issue.message).join(', ');
      return new Error(messages);
    }
    return result;
  }
}

