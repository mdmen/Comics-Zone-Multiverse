import { Shape, Size, Vector } from '../geometry';
import { Container } from '../Container';
import { Physics } from '../Physics';
import type { Drawable } from '../graphics';
import type { Collider } from '../collision';

export abstract class Entity extends Container {
  public readonly position = new Vector();
  public readonly origin = new Vector();
  public readonly bounds = new Size();
  public readonly tags = new Set();
  public scale = 1;
  public rotation = 0;
  public collider: Collider | null = null;
  public drawable: Drawable | null = null;
  public physics: Physics | null = null;
  public shape = Shape.None;

  constructor(physics?: boolean) {
    super();

    if (physics) {
      this.physics = new Physics(this);
    }
  }

  public override addChild(item: this) {
    super.addChild(item);

    item.drawable?.sortDrawableSiblingsByZIndex();

    return this;
  }

  public getGlobalPosition() {
    if (!this.parent) {
      return this.position;
    }

    const position = this.position.clone();
    this.traverseParents((entity) => {
      position.addV(entity.position);
    });

    return position;
  }

  public update(deltaStep: number) {
    this.physics?.update(deltaStep);

    this.children.forEach((entity) => {
      entity.update(deltaStep);
    });
  }

  public draw() {
    this.drawable?.draw();

    this.children.forEach((entity) => {
      entity.draw();
    });
  }

  public abstract updateBounds(): void;

  protected updateEntityBoundsRotation() {
    if (!this.rotation) return;

    const cos = Math.abs(Math.cos(this.rotation));
    const sin = Math.abs(Math.sin(this.rotation));
    const width = this.bounds.width * cos + this.bounds.height * sin;
    const height = this.bounds.width * sin + this.bounds.height * cos;

    this.bounds.set(width, height);
  }
}
