export class Vector {
  public x;
  public y;

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  public add(value: Vector): void {
    this.x += value.x;
    this.y += value.y;
  }

  public multiply(n: number): void {
    this.x *= n;
    this.y *= n;
  }
}
