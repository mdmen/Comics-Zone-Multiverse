import { Settings } from '../Settings';
import { Rectangle, type RectangleOptions, isRectanglesCollide } from '../math';

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

  private getRightOffsetBoundary(): number {
    return this.position.x + this.width - this.offsetX;
  }

  private getLeftOffsetBoundary(): number {
    return this.position.x + this.offsetX;
  }

  private getTopOffsetBoundary(): number {
    return this.position.x + this.offsetY;
  }

  private getBottomOffsetBoundary(): number {
    return this.position.x + this.height + this.offsetY;
  }

  private isTargetHitLeftBoundary(): boolean {
    return this.target.getPosition().x < this.getLeftOffsetBoundary();
  }

  private isTargetHitRightBoundary(): boolean {
    return (
      this.target.getPosition().x + this.target.getWidth() >
      this.getRightOffsetBoundary()
    );
  }

  private isTargetHitTopBoundary(): boolean {
    return this.target.getPosition().y < this.getTopOffsetBoundary();
  }

  private isTargetHitBottomBoundary(): boolean {
    return (
      this.target.getPosition().y + this.target.getHeight() >
      this.getBottomOffsetBoundary()
    );
  }

  private followTarget(): void {
    const targetPosition = this.target.getPosition();

    if (this.isTargetHitLeftBoundary()) {
      this.position.x = targetPosition.x - this.offsetX;
    } else if (this.isTargetHitRightBoundary()) {
      this.position.x =
        targetPosition.x + this.target.getWidth() + this.offsetX;
    }

    if (this.isTargetHitTopBoundary()) {
      this.position.y = targetPosition.y - this.offsetY;
    } else if (this.isTargetHitBottomBoundary()) {
      this.position.y =
        targetPosition.y + this.target.getHeight() + this.offsetY;
    }
  }

  private stayOnTheMap(): void {
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

  public isWithinCamera(rectangle: Rectangle): boolean {
    return isRectanglesCollide(this, rectangle);
  }
}
