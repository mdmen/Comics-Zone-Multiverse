export function countObjectKeys<T extends Record<PrimitiveTypes, unknown>>(
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

export function wait(ms = 0) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export function getRandomNumber(min = 0, max = 1) {
  return Math.random() * (max - min) + min;
}

export function getRandomInteger(min = 0, max = 1) {
  return Math.floor(getRandomNumber(min, max));
}
