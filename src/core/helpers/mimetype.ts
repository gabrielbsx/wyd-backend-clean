export const mimetypeToExtension = (mimetype: string): string | null => {
  return mimetype.split('/')[1];
}

