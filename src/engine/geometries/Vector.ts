import type { Point } from './types';

export class Vector implements Point {
  x;
  y;

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  set(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  copy(v: Point) {
    this.x = v.x;
    this.y = v.y;
  }

  add(v: Point) {
    this.x += v.x;
    this.y += v.y;
  }

  subtract(v: Point) {
    this.x -= v.x;
    this.y -= v.y;
  }

  scale(n: number) {
    this.x *= n;
    this.y *= n;
  }

  isEqualTo(v: Point) {
    return this.x === v.x && this.y === v.y;
  }

  isZero() {
    return this.x === 0 && this.y === 0;
  }
}
