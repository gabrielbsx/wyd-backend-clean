import { Post } from '@/core/domain/entities';
import mongoose, { Schema } from 'mongoose';
import mongooseAutoPopulate from 'mongoose-autopopulate';

const PostSchema = new Schema<Post>({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  excerpt: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    default: 'Notícia',
  },
  content: {
    type: String,
    required: true,
  },
  tags: [{
    type: String,
    required: false,
  }],
  published: {
    type: Boolean,
    required: true,
    default: false,
  },
}, { timestamps: true });

PostSchema.plugin(mongooseAutoPopulate);

export default mongoose.model<Post>('Post', PostSchema);

