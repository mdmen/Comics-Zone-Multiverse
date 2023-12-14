import { type Point, Vector } from '../geometries';

interface IRectangle {
  getPosition(): Vector;
  getWidth(): number;
  getHeight(): number;
}

export class Rectangle implements IRectangle {
  protected readonly position;

  constructor(x = 0, y = 0, protected width = 0, protected height = 0) {
    this.position = new Vector(x, y);
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

  setWidth(width: number) {
    this.width = width;
  }

  getHeight() {
    return this.height;
  }

  setHeight(height: number) {
    this.height = height;
  }

  isCollidingWith(target: IRectangle) {
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
