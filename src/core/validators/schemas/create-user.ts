export const createUserSchema = {
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      username: { type: 'string', minLength: 4, maxLength: 12, pattern: '^[a-zA-Z0-9]+$' },
      email: { type: 'string', format: 'email' },
      password: { type: 'string', minLength: 4, maxLength: 12, pattern: '^[a-zA-Z0-9]+$' },
      passwordConfirmation: { type: 'string', minLength: 4, maxLength: 12, pattern: '^[a-zA-Z0-9]+$' },
    },
    required: ['username', 'email', 'password', 'passwordConfirmation'],
  },
};

