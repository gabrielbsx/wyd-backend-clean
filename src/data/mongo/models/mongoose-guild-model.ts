import { Guild } from '@/core/domain/entities';
import mongoose, { Schema } from 'mongoose';

export const GuildSchema = new Schema<Guild>({
  name: {
    type: String,
    required: true,
  },
  fame: {
    type: Number,
    required: true,
  },
  kingdom: {
    type: String,
    required: true,
  },
  members: [
    { type: Schema.Types.ObjectId, ref: 'Player', autopopulate: { maxDepth: 2 } }
  ],
}, { timestamps: true });

export default mongoose.model<Guild>('Guild', GuildSchema);

