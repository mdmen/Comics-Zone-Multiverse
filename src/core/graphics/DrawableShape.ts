import { CircleEntity, RectEntity, type Entity } from '../entities';
import { Drawable, type RenderNode, type DrawableOptions } from './Drawable';
import { getRenderScope } from './scope';

export interface DrawableShapeOptions extends DrawableOptions {
  color?: string;
  borderColor?: string;
  borderWidth?: number;
}

type ShapeNode = {
  new (entity: Entity): RenderNode;
};

export abstract class DrawableShape extends Drawable {
  public color;
  public borderColor;
  public borderWidth;

  constructor({
    color = '',
    borderWidth = 0,
    borderColor = '',
    shouldCreateNode = true,
    ...options
  }: DrawableShapeOptions) {
    super(options);

    this.color = color;
    this.borderWidth = borderWidth;
    this.borderColor = borderColor;

    if (shouldCreateNode) {
      this.createNode();
    }
  }

  protected async createNode() {
    const scope = await getRenderScope();

    if (!scope) return;

    if (this.entity instanceof CircleEntity) {
      this.node = new (scope.EllipseNode as ShapeNode)(this.entity);
      return;
    }

    if (this.entity instanceof RectEntity) {
      this.node = new (scope.RectNode as ShapeNode)(this.entity);
      return;
    }

    throw Error(`Shape is not supported for entity ${this.entity}`);
  }
}
