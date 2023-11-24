import { type Point, Vector } from '../geometries';

export class Rectangle {
  protected position;
  protected width;
  protected height;

  constructor(x = 0, y = 0, width = 0, height = 0) {
    this.position = new Vector(x, y);
    this.width = width;
    this.height = height;
  }

  public getPosition(): Vector {
    return this.position;
  }

  public setPosition(x: number, y: number): void {
    this.position.set(x, y);
  }

  public getWidth(): number {
    return this.width;
  }

  public getHeight(): number {
    return this.height;
  }

  public setWidth(width: number): void {
    this.width = width;
  }

  public setHeight(height: number): void {
    this.height = height;
  }

  public isCollidingWith(target: Rectangle): boolean {
    const targetPosition = target.getPosition();

    return !(
      this.position.x > target.getWidth() + targetPosition.x ||
      this.position.x + this.width < targetPosition.x ||
      this.position.y > target.getHeight() + targetPosition.y ||
      this.position.y + this.height < targetPosition.y
    );
  }

  public isCollidingWithPoint(point: Point): boolean {
    return (
      point.x >= this.position.x &&
      point.x <= this.position.x + this.width &&
      point.y >= this.position.y &&
      point.y <= this.position.y + this.height
    );
  }
}
