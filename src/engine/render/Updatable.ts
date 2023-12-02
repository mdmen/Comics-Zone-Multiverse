import { Vector, Rectangle } from '../geometries';

interface Modifier {
  update(updatable: Updatable, step: number): void;
}

export interface UpdatableOptions {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

export abstract class Updatable extends Rectangle {
  protected velocity = new Vector();
  protected children: Set<Updatable> = new Set();
  protected modifiers = new Set<Modifier>();
  protected parent: Updatable | null = null;

  constructor({ x, y, width, height }: UpdatableOptions = {}) {
    super(x, y, width, height);
  }

  setVelocity(x: number, y: number) {
    this.velocity.set(x, y);
  }

  setParent(updatable: Updatable) {
    this.parent = updatable;
  }

  getOffsetPosition(): Vector {
    const position = new Vector();
    position.copy(this.position);

    let parent = this.parent;
    while (parent) {
      const parentPosition = parent.getPosition();

      position.add(parentPosition);

      parent = parent.parent;
    }

    return position;
  }

  update(step: number) {
    this.modifiers.forEach((modifier) => {
      modifier.update(this, step);
    });

    if (!this.velocity.isZero()) {
      const velocity = new Vector(this.velocity.x, this.velocity.y);
      velocity.scale(step);

      this.position.add(velocity);
    }

    this.children.forEach((updatable) => {
      updatable.update(step);
    });
  }

  addChild(updatable: Updatable) {
    updatable.setParent(this);

    this.children.add(updatable);
  }

  getChild(index: number): Updatable {
    const child = [...this.children].at(index);

    if (!child) {
      throw Error(`Group's element with index ${index} does not exist`);
    }

    return child;
  }

  addModifier(modifier: Modifier) {
    this.modifiers.add(modifier);
  }

  deleteModifier(modifier: Modifier) {
    this.modifiers.delete(modifier);
  }

  removeChild(updatable: Updatable) {
    this.children.delete(updatable);
  }

  destroy() {
    this.children.forEach((updatable) => {
      updatable.destroy();
    });

    this.modifiers.clear();
    this.children.clear();
    this.parent = null;
  }
}
