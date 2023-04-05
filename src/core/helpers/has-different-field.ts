export const hasDifferentField = <T>(fields: Object, validFields: string[]): boolean => {
  return Object.keys(fields).some((field) => !validFields.includes(field));
}

