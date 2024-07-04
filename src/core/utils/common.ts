import type { LinkedList } from '../list/LinkedList';

export function isEmpty<T>(
  collection:
    | T[]
    | Set<T>
    | Map<unknown, T>
    | LinkedList
    | Record<string | number | symbol, T>
) {
  return collection.constructor === Object
    ? Object.entries(collection).length
    : Array.isArray(collection)
    ? !collection.length
    : !collection.size;
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

export function toRadians(degrees: number) {
  return (degrees * Math.PI) / 180;
}
