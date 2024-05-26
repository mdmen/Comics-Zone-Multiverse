import type { LinkedList } from '../linked-list/LinkedList';

export function isProduction() {
  return process.env.NODE_ENV === 'production';
}

export function isEmpty(
  value: unknown[] | Set<unknown> | Map<unknown, unknown> | LinkedList
) {
  return Array.isArray(value) ? !value.length : !value.size;
}

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function squashSpaces(str: string) {
  return str.replace(/\s\s+/g, ' ').trim();
}

export function lerp(start: number, end: number, percent: number) {
  return start * (1 - percent) + end * percent;
}

export function clamp(min: number, max: number, value: number) {
  return Math.min(Math.max(min, value), max);
}
