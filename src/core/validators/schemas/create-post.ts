export const createPostSchema = {
  body: {
    type: 'object',
    properties: {
      title: { type: 'string' },
      content: { type: 'string' },
      excerpt: { type: 'string' },
      published: { type: 'boolean' },
      category: { type: 'string' },
      tags: {
        type: 'array',
        items: { type: 'string' },
      },
      thumbnail: {
        type: 'array',
        items: { type: 'object' },
      },
    },
    required: ['title', 'content', 'excerpt', 'published', 'category', 'tags', 'thumbnail'],
  },
};

