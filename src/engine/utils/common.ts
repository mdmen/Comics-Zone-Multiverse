import { Settings } from '../Settings';
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

export function generateUniqueId(): string {
  if (typeof crypto !== 'undefined') {
    return crypto.randomUUID();
  }

  return Math.floor(Math.random() * Date.now())
    .toString(36)
    .slice(0, 10);
}

export function isDOMEngine(): boolean {
  return Settings.get('renderEngine') === 'dom';
}
