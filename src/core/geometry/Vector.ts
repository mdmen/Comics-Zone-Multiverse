export class Vector {
  constructor(public x = 0, public y = 0) {}

  public set(x: number, y = x) {
    this.x = x;
    this.y = y;

    return this;
  }

  public copy(v: Vector) {
    this.x = v.x;
    this.y = v.y;

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

  public add(x: number, y = x) {
    this.x += x;
    this.y += y;
  }

  public addV(v: Vector) {
    this.x += v.x;
    this.y += v.y;

    return this;
  }

  public subV(v: Vector) {
    this.x -= v.x;
    this.y -= v.y;

    return this;
  }

  public scale(x: number, y = x) {
    this.x *= x;
    this.y *= y;

    return this;
  }

  public clone() {
    return new Vector(this.x, this.y);
  }

  public normalize() {
    const length = this.getLength();

    if (length === 0) return this;

    return this.scale(1 / length);
  }

  public dot(v: Vector) {
    return this.x * v.x + this.y * v.y;
  }

  public cross(v: Vector) {
    return this.x * v.y - this.y * v.x;
  }

  public getDistance(v: Vector) {
    return Math.hypot(this.x - v.x, this.y - v.y);
  }

  public getLength() {
    return Math.hypot(this.x, this.y);
  }

  public isZero() {
    return this.x === 0 && this.y === 0;
  }

  public isEqual(v: Vector) {
    return this.x === v.x && this.y === v.y;
  }
}
