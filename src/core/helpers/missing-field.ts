type MissingField = {
  has: boolean;
  field?: string;
};

export const missingField = (data: any, requiredFields: string[]): MissingField => {
  for (const field of requiredFields) {
    if (!data[field]) {
      return {
        has: true,
        field,
      };
    }
  }
  return { has: false };
}

