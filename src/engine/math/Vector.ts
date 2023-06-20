import type { Point } from './Point';

export class Vector implements Point {
  public x;
  public y;

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  public add(value: Vector | Point): void {
    this.x += value.x;
    this.y += value.y;
  }

  public multiply(n: number): void {
    this.x *= n;
    this.y *= n;
  }
}
