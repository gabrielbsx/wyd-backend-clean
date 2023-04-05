export const createProductSchema = {
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      description: { type: 'string' },
      thumbnail: {
        type: 'array',
        items: { type: 'object' },
      },
      price: { type: 'number' },
      donation: { type: 'number' },
      hasDiscount: { type: 'boolean' },
      priceWithoutDiscount: { type: 'number' },
      discountPricePercentage: { type: 'number' },
      donationWithoutDiscount: { type: 'number' },
      discountDonationPercentage: { type: 'number' },
      isActivated: { type: 'boolean' },
    },
    required: [
      'name',
      'description',
      'thumbnail',
      'price',
      'donation',
      'hasDiscount',
      'isActivated',
    ],
  },
};

