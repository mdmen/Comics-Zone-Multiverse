import type { Point } from './Point';

export class Vector implements Point {
  public x;
  public y;

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  public set(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }

  public copy(v: Point): void {
    this.x = v.x;
    this.y = v.y;
  }

  public add(v: Point): void {
    this.x += v.x;
    this.y += v.y;
  }

  public subtract(v: Point): void {
    this.x -= v.x;
    this.y -= v.y;
  }

  public scale(n: number): void {
    this.x *= n;
    this.y *= n;
  }

  public isEqualTo(v: Point): boolean {
    return this.x === v.x && this.y === v.y;
  }

  public isZero(): boolean {
    return this.x === 0 && this.y === 0;
  }
}
