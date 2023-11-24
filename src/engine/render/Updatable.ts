import { Vector, Rectangle } from '../geometries';

export interface UpdatableOptions {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

export abstract class Updatable extends Rectangle {
  protected readonly velocity = new Vector();
  protected readonly children: Set<Updatable> = new Set();
  protected parent: Updatable | null = null;

  constructor({ x, y, width, height }: UpdatableOptions = {}) {
    super(x, y, width, height);
  }

  public setVelocity(x: number, y: number): void {
    this.velocity.set(x, y);
  }

  public setParent(updatable: Updatable): void {
    this.parent = updatable;
  }

  public getOffsetPosition(): Vector {
    const position = new Vector();
    position.add(this.position);

    let parent = this.parent;
    while (parent) {
      const parentPosition = parent.getPosition();

      position.add(parentPosition);

      parent = parent.parent;
    }

    return position;
  }

  public update(step: number): void {
    this.children.forEach((updatable) => {
      updatable.update(step);
    });

    if (this.velocity.isZero()) return;

    const velocity = new Vector(this.velocity.x, this.velocity.y);
    velocity.scale(step);

    this.position.add(velocity);
  }

  public addChild(updatable: Updatable): void {
    updatable.setParent(this);

    this.children.add(updatable);
  }

  public getChild(index: number): Updatable {
    const child = [...this.children].at(index);

    if (!child) {
      throw Error(`Group's element with index ${index} does no exists`);
    }

    return child;
  }

  public removeChild(updatable: Updatable): void {
    this.children.delete(updatable);
  }

  public destroy(): void {
    this.children.forEach((updatable) => {
      updatable.destroy();
    });

    this.parent = null;
    this.children.clear();
  }

  public draw(): void {
    this.children.forEach((updatable) => {
      updatable.draw();
    });
  }
}
