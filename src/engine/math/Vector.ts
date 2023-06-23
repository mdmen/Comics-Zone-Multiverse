export class Vector {
  public x: number;
  public y: number;

  constructor(x = 0, y = 0) {
    this.set(x, y);
  }

  public set(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }

  public copy(v: Vector): void {
    this.x = v.x;
    this.y = v.y;
  }

  public add(v: Vector): void {
    this.x += v.x;
    this.y += v.y;
  }

  public multiply(n: number): void {
    this.x *= n;
    this.y *= n;
  }

  public isEqualTo(v: Vector): boolean {
    return this.x === v.x && this.y === v.y;
  }
}
