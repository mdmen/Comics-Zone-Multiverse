import { Shape, Vector } from '../geometry';
import { Entity } from './Entity';

export interface PolyEntityOptions {
  verteces?: Vector[];
}

export class PolyEntity extends Entity {
  public verteces!: Vector[];
  public normals!: Vector[];

  constructor({ layer, verteces = [], ...options }: PolyEntityOptions) {
    super(options);

    this.shape = Shape.Polygon;
    this.setVerteces(verteces);

    if (layer) {
      this.drawable = new DrawableShape({ entity: this, layer });
    }
  }

  public setVerteces(verteces: Vector[]) {
    this.verteces = [...verteces];
    this.normals = [...verteces];

    this.updateBounds();
  }

  public updateBounds() {}
}
