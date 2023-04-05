import { Player, Evolution, GuildRole, Kingdom, Item } from '@/core/domain/entities';
import mongoose, { Schema } from 'mongoose';
import mongooseAutoPopulate from 'mongoose-autopopulate';

const PlayerSchema = new Schema<Player>({
  nick: {
    type: String,
    required: true,
  },
  guild: {
    type: Schema.Types.ObjectId,
    ref: 'Guild',
    autopopulate: { maxDepth: 2 },
    required: false,
  },
  level: {
    type: Number,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  evolution: {
    type: String,
    enum: Evolution,
    required: true,
  },
  kingdom: {
    type: String,
    enum: Kingdom,
    required: false,
  },
  guildRole: {
    type: String,
    enum: GuildRole,
    required: false,
  },
  inventory: [{
    type: Object,
    required: false,
  }],
  equipment: [{
    type: Object,
    required: false,
  }],
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: { maxDepth: 1 },
    required: true,
  },
}, { timestamps: true });

PlayerSchema.plugin(mongooseAutoPopulate);

export default mongoose.model<Player>('Player', PlayerSchema);

