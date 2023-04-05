import { Role, User } from '@/core/domain/entities';
import mongoose, { Schema } from 'mongoose';
import mongooseAutoPopulate from 'mongoose-autopopulate';

export const UserSchema = new Schema<User>({
  name: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: Role,
    default: Role.PLAYER,
    required: true,
  },
  donation: {
    type: Number,
    default: 0,
    required: true,
  },
  players: [{
    type: Schema.Types.ObjectId,
    ref: 'Player',
    autopopulate: { maxDepth: 2 },
    required: false,
  }],
  orders: [{
    type: Schema.Types.ObjectId,
    ref: 'Order',
    autopopulate: { maxDepth: 2 },
    required: false,
  }],
}, { timestamps: true });

UserSchema.plugin(mongooseAutoPopulate);

export default mongoose.model<User>('User', UserSchema);

