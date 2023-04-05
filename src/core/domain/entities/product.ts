import { Entity } from './common';

export interface Product extends Entity {
  name: string;
  slug: string;
  description: string;
  thumbnail: string;
  price: number;
  donation: number;
  hasDiscount: boolean;
  priceWithoutDiscount?: number;
  discountPricePercentage?: number;
  donationWithoutDiscount?: number;
  discountDonationPercentage?: number;
  isActivated: boolean;
}

