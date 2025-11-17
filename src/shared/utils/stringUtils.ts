/**
 * Normalizes a string for search comparison (lowercase and trim)
 */
export function normalizeSearch(search: string): string {
  return search.toLowerCase().trim();
}

/**
 * Checks if a string includes another string (case-insensitive)
 */
export function includesIgnoreCase(text: string, search: string): boolean {
  return normalizeSearch(text).includes(normalizeSearch(search));
}

