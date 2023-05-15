export function isEmpty<T extends unknown>(
  value: T[] | Set<T> | Map<T, T>
): boolean {
  if (Array.isArray(value)) {
    return !value.length;
  }

  return !value.size;
}
