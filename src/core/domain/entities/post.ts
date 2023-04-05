import { Entity } from './common';

export interface Post extends Entity {
  title: string;
  excerpt: string;
  slug: string;
  thumbnail: string;
  content: string;
  category: string;
  published: boolean;
  tags?: string[];
}

