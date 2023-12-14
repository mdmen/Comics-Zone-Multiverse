import type { Point } from './types';

export class Vector {
  constructor(public x = 0, public y = 0) {}

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
