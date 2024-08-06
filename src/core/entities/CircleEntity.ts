import { Entity } from './Entity';
import { CircleCollider } from '../collision';
import { Shape } from '../geometry';
import { DrawableCircle } from '../graphics/DrawableCircle';
import { Layer } from '../graphics';

export interface CircleEntityOptions {
  layer?: Layer;
  physics?: boolean;
  radius?: number;
}

export class CircleEntity extends Entity {
  private _radius;
  public declare drawable: DrawableCircle | null;

  constructor({ layer, radius = 0, physics = false }: CircleEntityOptions) {
    super(physics);

    this._radius = radius;
    this.shape = Shape.Circle;

    if (layer) {
      this.drawable = new DrawableCircle({ entity: this, layer, radius });
    }

    if (physics) {
      this.collider = new CircleCollider(this);
    }
  }

  public set radius(n: number) {
    this._radius = n;

    this.updateBounds();

    if (this.drawable) {
      this.drawable.radius = n;
    }
  }

  public get radius() {
    return this._radius;
  }

  public updateBounds() {
    this.bounds.set(this.radius * 2, this.radius * 2);
    this.bounds.scale(this.scale);
    this.updateEntityBoundsRotation();
  }
}
