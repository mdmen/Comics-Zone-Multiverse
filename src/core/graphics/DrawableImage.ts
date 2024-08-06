import { type Entity, ImageEntity, SpriteEntity } from '../entities';
import { Vector } from '../geometry';
import { Drawable, type RenderNode, type DrawableOptions } from './Drawable';
import { getRenderScope } from './scope';

export interface ImageOptions extends DrawableOptions {
  image: HTMLImageElement;
}

type ShapeNode = {
  new (entity: Entity): RenderNode;
};

export class DrawableImage extends Drawable {
  public readonly image;
  public readonly source = new Vector(0, 0);
  public flipped = false;

  constructor({ image, shouldCreateNode = true, ...options }: ImageOptions) {
    super({ ...options });

    this.image = image;

    if (shouldCreateNode) {
      this.createNode();
    }
  }

  protected async createNode() {
    const scope = await getRenderScope();

    if (!scope) return;

    if (this.entity instanceof SpriteEntity) {
      this.node = new (scope.SpriteNode as ShapeNode)(this.entity);
      return;
    }

    if (this.entity instanceof ImageEntity) {
      this.node = new (scope.ImageNode as ShapeNode)(this.entity);
      return;
    }

    throw Error(`Shape is not supported for entity ${this.entity}`);
  }
}
