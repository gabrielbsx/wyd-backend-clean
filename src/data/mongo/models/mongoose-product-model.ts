import { Product } from '@/core/domain/entities';
import mongoose from 'mongoose';
import mongooseAutoPopulate from 'mongoose-autopopulate';

const ProductSchema = new mongoose.Schema<Product>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  donation: {
    type: Number,
    required: true,
  },
  hasDiscount: {
    type: Boolean,
    required: true,
    default: false,
  },
  priceWithoutDiscount: {
    type: Number,
    required: false,
  },
  discountPricePercentage: {
    type: Number,
    required: false,
  },
  donationWithoutDiscount: {
    type: Number,
    required: false,
  },
  discountDonationPercentage: {
    type: Number,
    required: false,
  },
  isActivated: {
    type: Boolean,
    required: true,
    default: false,
  },
}, { timestamps: true });

ProductSchema.plugin(mongooseAutoPopulate);

export default mongoose.model<Product>('Product', ProductSchema);

