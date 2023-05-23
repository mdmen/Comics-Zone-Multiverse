export function isEmpty(
  value: unknown[] | Set<unknown> | Map<unknown, unknown>
): boolean {
  if (Array.isArray(value)) {
    return !value.length;
  }

  return !value.size;
}

export function isAudio(value: unknown): value is AudioBuffer {
  return value instanceof AudioBuffer;
}

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}
