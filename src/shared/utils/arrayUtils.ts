/**
 * Creates a map from an array using a key extractor function
 */
export function createMap<T, K extends string | number>(
  array: T[],
  keyExtractor: (item: T) => K
): Record<K, T> {
  return array.reduce((acc, item) => {
    acc[keyExtractor(item)] = item;
    return acc;
  }, {} as Record<K, T>);
}

/**
 * Gets the last N items from an array
 */
export function getLastItems<T>(array: T[], count: number): T[] {
  return array.slice(-count);
}

