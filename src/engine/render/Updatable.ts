import { Rectangle, Vector } from '../geometries';

interface Modifier {
  update(updatable: Updatable, step: number): void;
}

export interface UpdatableOptions {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

export class Updatable extends Rectangle {
  protected readonly modifiers = new Set<Modifier>();
  protected readonly children = new Set<Updatable>();
  protected parent: Updatable | null = null;
  readonly velocity = new Vector();

  constructor({ x = 0, y = 0, width = 0, height = 0 }: UpdatableOptions = {}) {
    super(x, y, width, height);
  }

  addChild(updatable: Updatable) {
    updatable.parent = this;
    this.children.add(updatable);

    return this;
  }

  removeChild(updatable: Updatable) {
    updatable.parent = null;
    this.children.delete(updatable);

    return this;
  }

  getPosition(): Vector {
    const position = new Vector(this.position.x, this.position.y);

    let parent = this.parent;
    while (parent) {
      position.add(parent.position);

      parent = parent.parent;
    }

    return position;
  }

  update(step: number) {
    this.modifiers.forEach((modifier) => {
      modifier.update(this, step);
    });

    this.position.add(this.velocity);

    this.children.forEach((updatable) => {
      updatable.update(step);
    });
  }

  addModifier(modifier: Modifier) {
    this.modifiers.add(modifier);
  }

  deleteModifier(modifier: Modifier) {
    this.modifiers.delete(modifier);
  }

  destroy() {
    this.children.forEach((updatable) => {
      updatable.destroy();
    });
    this.children.clear();
    this.modifiers.clear();
    this.parent = null;
  }
}
