import type { Point } from './Point';
import { Observable } from './Observable';

export class Vector implements Point {
  public readonly mutated = new Observable<this>();

  constructor(public x = 0, public y = 0) {}

  public set(x: number, y: number) {
    this.x = x;
    this.y = y;

    this.mutated.notify(this);
  }

  public copy(v: Point) {
    this.set(v.x, v.y);
  }

  public add(v: Point) {
    this.set(this.x + v.x, this.y + v.y);
  }

  public subtract(v: Point) {
    this.set(this.x - v.x, this.y - v.y);
  }

  public scale(v: Point) {
    this.set(this.x * v.x, this.y * v.y);
  }

  public isEqualTo(v: Point) {
    return this.x === v.x && this.y === v.y;
  }

  public isZero() {
    return this.x === 0 && this.y === 0;
  }
}
