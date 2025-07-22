/**
 * Generate a URL-friendly slug from a string. Should be kept in sync with the backend slug generation.
 * @param s The input string.
 * @returns The generated slug.
 */
export const generateSlug = (s: string): string =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
