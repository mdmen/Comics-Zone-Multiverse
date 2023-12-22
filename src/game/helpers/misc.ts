export function countObjectKeys<T extends Record<PrimitiveKeys, unknown>>(
  object: T | T[]
) {
  if (Array.isArray(object)) {
    return object.reduce((sum, obj) => sum + Object.keys(obj).length, 0);
  }

  return Object.keys(object).length;
}

export function getPercent(total: number, value: number) {
  return Math.floor((value / total) * 100);
}
