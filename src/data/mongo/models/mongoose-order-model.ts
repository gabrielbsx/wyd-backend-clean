import { Order, PaymentMethod, PaymentStatus } from '@/core/domain/entities';
import mongoose, { Schema } from 'mongoose';
import mongooseAutoPopulate from 'mongoose-autopopulate';

export const OrderSchema = new Schema<Order>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: { maxDepth: 1 },
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    autopopulate: { maxDepth: 1 },
  },
  reference: {
    type: String,
  },
  recieved: {
    type: Boolean,
    default: false,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: PaymentStatus,
    required: true,
    default: PaymentStatus.PENDING,
  },
  paymentMethod: {
    type: String,
    enum: PaymentMethod,
    required: true,
  },
  paymentId: {
    type: String,
  },
  paymentUrl: {
    type: String,
  },
  paymentQRCode: {
    type: String,
  },
  paymentDate: {
    type: Date,
    required: false,
  },
  expirationDate: {
    type: Date,
    required: true,
  },
}, { timestamps: true });

OrderSchema.plugin(mongooseAutoPopulate);

export default mongoose.model<Order>('Order', OrderSchema);

