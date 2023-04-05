import { Entity, PaymentMethod, PaymentStatus } from './common';
import { Product } from './product';
import { User } from './user';

export interface Order extends Entity {
  user: User;
  product: Product;
  recieved: boolean;
  reference: string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  paymentId?: string;
  paymentUrl?: string;
  paymentQRCode?: string;
  paymentDate?: Date;
  expirationDate: Date;
}

