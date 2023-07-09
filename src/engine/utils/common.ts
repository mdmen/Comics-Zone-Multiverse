import type { LinkedList } from '../list/LinkedList';

export function isEmpty(
  value: unknown[] | Set<unknown> | Map<unknown, unknown> | LinkedList
): boolean {
  return Array.isArray(value) ? !value.length : !value.size;
}

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}
