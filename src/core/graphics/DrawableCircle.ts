import { type Entity } from '../entities';
import type { RenderNode } from './Drawable';
import { DrawableShape, type DrawableShapeOptions } from './DrawableShape';
import { getRenderScope } from './scope';

export interface DrawableCircleOptions extends DrawableShapeOptions {
  radius?: number;
}

type ShapeNode = {
  new (entity: Entity): RenderNode;
};

export class DrawableCircle extends DrawableShape {
  public radius;

  constructor({
    radius = 0,
    shouldCreateNode = true,
    ...options
  }: DrawableCircleOptions) {
    super({ shouldCreateNode: false, ...options });

    this.radius = radius;

    if (shouldCreateNode) {
      this.createNode();
    }
  }

  protected async createNode() {
    const scope = await getRenderScope();

    if (!scope) return;

    this.node = new (scope.EllipseNode as ShapeNode)(this.entity);
  }
}
