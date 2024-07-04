import type { Point } from './Point';

export class Vector implements Point {
  constructor(public x = 0, public y = 0) {}

  public set(x: number, y = x) {
    this.x = x;
    this.y = y;

    return this;
  }

  public setX(n: number) {
    this.x = n;

    return this;
  }

  public setY(n: number) {
    this.y = n;

    return this;
  }

  public copy(v: Point) {
    this.x = v.x;
    this.y = v.y;

    return this;
  }

  public add(x: number, y = x) {
    this.x += x;
    this.y += y;
  }

  public addV(v: Point) {
    this.x += v.x;
    this.y += v.y;

    return this;
  }

  public subV(v: Point) {
    this.x -= v.x;
    this.y -= v.y;

    return this;
  }

  public scale(x: number, y = x) {
    this.x *= x;
    this.y *= y;

    return this;
  }

  public normalize() {
    const length = this.getLength();

    if (length === 0) return this;

    return this.scale(1 / length);
  }

  public dot(v: Point) {
    return this.x * v.x + this.y * v.y;
  }

  public cross(v: Point) {
    return this.x * v.y - this.y * v.x;
  }

  public getLength() {
    return Math.hypot(this.x, this.y);
  }

  public getDistance(v: Point) {
    return Math.hypot(this.x - v.x, this.y - v.y);
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
