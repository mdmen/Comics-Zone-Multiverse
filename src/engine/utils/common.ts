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

export function squashSpaces(str: string) {
  return str.replace(/\s\s+/g, ' ').trim();
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

export function lerp(start: number, end: number, percent: number) {
  return start * (1 - percent) + end * percent;
}

export function clamp(min: number, max: number, value: number) {
  return Math.min(Math.max(min, value), max);
}
