import { Settings } from '../Settings';
import { Rectangle, type RectangleOptions } from '../math/Rectangle';

interface Options extends RectangleOptions {
  map: Rectangle;
  target: Rectangle;
  offsetX?: number;
  offsetY?: number;
}

export class Camera extends Rectangle {
  private map;
  private target;
  private offsetX;
  private offsetY;

  constructor({
    map,
    target,
    offsetX = Settings.get('cameraOffsetX'),
    offsetY = Settings.get('cameraOffsetY'),
    ...options
  }: Options) {
    super(options);

    const {
      width = Settings.get('canvasWidth'),
      height = Settings.get('canvasHeight'),
    } = options;
    this.width = width;
    this.height = height;

    this.map = map;
    this.target = target;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
  }

  private getRightTargetBoundary(): number {
    return this.position.x + this.width - this.offsetX;
  }

  private getLeftTargetBoundary(): number {
    return this.position.x + this.offsetX;
  }

  private getTopTargetBoundary(): number {
    return this.position.x + this.offsetY;
  }

  private getBottomTargetBoundary(): number {
    return this.position.x + this.height + this.offsetY;
  }

  private followTarget(): void {
    const targetPosition = this.target.getPosition();

    if (targetPosition.x < this.getLeftTargetBoundary()) {
      this.position.x = targetPosition.x - this.offsetX;
    } else if (
      this.position.x + this.target.getWidth() >
      this.getRightTargetBoundary()
    ) {
      this.position.x =
        targetPosition.x + this.target.getWidth() + this.offsetX;
    }

    if (this.position.y < this.getTopTargetBoundary()) {
      this.position.y = targetPosition.y - this.offsetY;
    } else if (
      this.position.y + this.target.getHeight() >
      this.getBottomTargetBoundary()
    ) {
      this.position.y =
        targetPosition.y + this.target.getHeight() + this.offsetY;
    }
  }

  public stayOnTheMap(): void {
    const mapPosition = this.map.getPosition();

    if (this.position.x < mapPosition.x) {
      this.position.x = mapPosition.x;
    } else if (this.position.x + this.width > this.map.getWidth()) {
      this.position.x = this.map.getWidth() - this.width;
    }

    if (this.position.y < mapPosition.y) {
      this.position.y = mapPosition.y;
    } else if (this.position.y + this.height > this.map.getHeight()) {
      this.position.y = this.map.getHeight() - this.height;
    }
  }

  public update(): void {
    this.followTarget();
    this.stayOnTheMap();
  }
}
