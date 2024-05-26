import type { Point } from './Point';

export class Vector implements Point {
  constructor(public x = 0, public y = 0) {}

  public set(x: number, y = x) {
    this.x = x;
    this.y = y;
  }

  public copy(v: Point) {
    this.x = v.x;
    this.y = v.y;
  }

  public addV(v: Point) {
    this.x += v.x;
    this.y += v.y;
  }

  public subV(v: Point) {
    this.x -= v.x;
    this.y -= v.y;
  }

  public scale(x: number, y = x) {
    this.x *= x;
    this.y *= y;
  }

  public getLength() {
    return Math.hypot(this.x, this.y);
  }

  public getDistance(v: Point) {
    return Math.hypot(v.x - this.x, v.y - this.y);
  }

  public clone() {
    return new Vector(this.x, this.y);
  }

  public isEqual(v: Point) {
    return this.x === v.x && this.y === v.y;
  }

  public isZero() {
    return this.x === 0 && this.y === 0;
  }
}
