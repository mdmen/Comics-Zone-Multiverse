import type { LinkedList } from '../linked-list/LinkedList';

export function isEmpty(
  value: unknown[] | Set<unknown> | Map<unknown, unknown> | LinkedList
) {
  return Array.isArray(value) ? !value.length : !value.size;
}

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

export function generateUniqueId() {
  if (typeof crypto !== 'undefined') {
    return crypto.randomUUID();
  }

  return Math.floor(Math.random() * Date.now())
    .toString(36)
    .slice(0, 10);
}

export function squashSpaces(str: string) {
  return str.replace(/\s\s+/g, ' ');
}

export function getPercent(total: number, value: number) {
  return Math.floor((value / total) * 100);
}

export function delay(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export function getRandomNumber(min = 0, max = 1) {
  return Math.random() * (max - min) + min;
}

export function getRandomInteger(min = 0, max = 1) {
  return Math.floor(getRandomNumber(min, max));
}
