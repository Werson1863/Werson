import manifest from '@photos/manifest.json';

export type PhotoName = keyof typeof manifest;
export const photos = manifest;
