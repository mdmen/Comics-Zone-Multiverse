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

  getPosition() {
    return this.position;
  }

  setPosition(x: number, y: number) {
    this.position.set(x, y);
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }

  setWidth(width: number) {
    this.width = width;
  }

  setHeight(height: number) {
    this.height = height;
  }

  isCollidingWith(target: Rectangle) {
    const targetPosition = target.getPosition();

    return !(
      this.position.x > target.getWidth() + targetPosition.x ||
      this.position.x + this.width < targetPosition.x ||
      this.position.y > target.getHeight() + targetPosition.y ||
      this.position.y + this.height < targetPosition.y
    );
  }

  isCollidingWithPoint(point: Point) {
    return (
      point.x >= this.position.x &&
      point.x <= this.position.x + this.width &&
      point.y >= this.position.y &&
      point.y <= this.position.y + this.height
    );
  }
}
