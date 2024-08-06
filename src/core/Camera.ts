import { Vector, type Rectangle } from './geometry';

interface Options {
  target: Rectangle;
  world: Rectangle;
  position?: Vector;
  size?: Vector;
  offset?: Vector;
}

export class Camera implements Rectangle {
  private readonly target;
  private readonly world;
  public readonly position;
  public readonly size;
  public readonly offset;

  constructor({
    target,
    world,
    position = new Vector(),
    size = new Vector(CANVAS_WIDTH, CANVAS_HEIGHT),
    offset = new Vector(CAMERA_INNER_OFFSET_X, CAMERA_INNER_OFFSET_Y),
  }: Options) {
    this.target = target;
    this.world = world;
    this.position = position;
    this.size = size;
    this.offset = offset;
  }

  private getRightTargetBoundary() {
    return this.position.x + this.size.x - this.offset.x;
  }

  private getLeftTargetBoundary() {
    return this.position.x + this.offset.x;
  }

  private getTopTargetBoundary() {
    return this.position.y - this.offset.y;
  }

  private getBottomTargetBoundary() {
    return this.position.y + this.size.y - this.offset.y;
  }

  private isTargetHitLeftBoundary() {
    return this.target.position.x <= this.getLeftTargetBoundary();
  }

  private isTargetHitRightBoundary() {
    return (
      this.target.position.x + this.target.size.x >=
      this.getRightTargetBoundary()
    );
  }

  private isTargetHitTopBoundary() {
    return this.target.position.y <= this.getTopTargetBoundary();
  }

  private isTargetHitBottomBoundary() {
    return (
      this.target.position.y + this.target.size.y >=
      this.getBottomTargetBoundary()
    );
  }

  private followTarget() {
    const targetPosition = this.target.position;

    if (this.isTargetHitLeftBoundary()) {
      this.position.x = targetPosition.x - this.offset.x;
    } else if (this.isTargetHitRightBoundary()) {
      this.position.x = targetPosition.x + this.target.size.x + this.offset.x;
    }

    if (this.isTargetHitTopBoundary()) {
      this.position.y = targetPosition.y - this.offset.y;
    } else if (this.isTargetHitBottomBoundary()) {
      this.position.y = targetPosition.y + this.target.size.y + this.offset.y;
    }
  }

  private stayInWorld() {
    const worldPosition = this.world.position;

    if (this.position.x < worldPosition.x) {
      this.position.x = worldPosition.x;
    } else if (this.position.x + this.size.x > this.world.size.x) {
      this.position.x = this.world.size.x - this.size.x;
    }

    if (this.position.y < worldPosition.y) {
      this.position.y = worldPosition.y;
    } else if (this.position.y + this.size.y > this.world.size.y) {
      this.position.y = this.world.size.y - this.size.y;
    }
  }

  public update() {
    this.followTarget();
    this.stayInWorld();
  }
}
