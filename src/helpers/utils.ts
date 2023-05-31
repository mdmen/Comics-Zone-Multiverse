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

export const isProduction = ((): (() => boolean) => {
  const value = process.env.NODE_ENV === 'production';

  return function () {
    return value;
  };
})();
