import type { Point } from './Point';

export class Vector {
  constructor(public x = 0, public y = 0) {}

  public set(x: number, y = x) {
    this.x = x;
    this.y = y;

    return this;
  }

  public copy(v: Point) {
    return this.set(v.x, v.y);
  }

  public add(x: number, y = x) {
    this.x += x;
    this.y += y;
  }

  public addV(v: Point) {
    return this.add(v.x, v.y);
  }

  public sub(x: number, y = x) {
    this.x -= x;
    this.y -= y;

    return this;
  }

  public subV(v: Point) {
    return this.sub(v.x, v.y);
  }

  public scale(x: number, y = x) {
    this.x *= x;
    this.y *= y;

    return this;
  }

  public scaleV(v: Point) {
    return this.scale(v.x, v.y);
  }

  public clone() {
    return new Vector(this.x, this.y);
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

  public getDistance(v: Point) {
    return Math.hypot(this.x - v.x, this.y - v.y);
  }

  public getLength() {
    return Math.hypot(this.x, this.y);
  }

  public isZero() {
    return this.x === 0 && this.y === 0;
  }

  public isEqual(v: Point) {
    return this.x === v.x && this.y === v.y;
  }
}
