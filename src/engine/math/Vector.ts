import type { Point } from './Point';

export class Vector implements Point {
  public x: number;
  public y: number;

  constructor(x = 0, y = 0) {
    this.set(x, y);
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
}
