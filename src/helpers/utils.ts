export function isEmpty(
  value: unknown[] | Set<unknown> | Map<unknown, unknown>
): boolean {
  if (Array.isArray(value)) {
    return !value.length;
  }

  return !value.size;
}

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}

export function isDefined<T>(value: T): value is NonUndefined<T> {
  return typeof value !== undefined;
}
