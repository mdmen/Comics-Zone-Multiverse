import { Rectangle } from '../math/Rectangle';
import { Vector } from '../math';

export interface UpdatableOptions {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

export abstract class Updatable extends Rectangle {
  protected velocity = new Vector();
  protected visible = true;

  constructor({ x, y, width, height }: UpdatableOptions) {
    super(x, y, width, height);
  }

  public hide(): void {
    this.visible = false;
  }

  public show(): void {
    this.visible = true;
  }

  public isVisible(): boolean {
    return this.visible;
  }

  public setVelocity(x: number, y: number): void {
    this.velocity.set(x, y);
  }

  public update(step: number): void {
    if (this.velocity.isZero()) return;

    const velocity = new Vector(this.velocity.x, this.velocity.y);
    velocity.scale(step);

    this.position.add(velocity);
  }
}
