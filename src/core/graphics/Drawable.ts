import type { Layer } from './Layer';
import { HTMLNode } from './html';
import type { CanvasNode } from './canvas';
import { Size, Vector, Shapes } from '../geometry';
import { Container } from '../Container';

export interface DrawableOptions {
  layer: Layer;
  x?: number;
  y?: number;
  originX?: number;
  originY?: number;
  visible?: boolean;
  opacity?: number;
  zIndex?: number;
  rotation?: number;
  scale?: number;
}

export class Drawable extends Container {
  public readonly layer;
  public shape = Shapes.NONE;
  public readonly node!: HTMLNode | CanvasNode;
  public readonly modifiers = new Set<
    (drawable: Drawable, deltaStep: number) => void
  >();
  public readonly velocity;
  public readonly position;
  public readonly origin;
  public readonly size = new Size();
  public opacity;
  public zIndex;
  public visible;
  public scale;
  public rotation;

  constructor({
    layer,
    x,
    y,
    visible = true,
    opacity = 1,
    zIndex = 0,
    originX = 0,
    originY = 0,
    scale = 1,
    rotation = 0,
  }: DrawableOptions) {
    super();

    this.layer = layer;
    this.position = new Vector(x, y);
    this.velocity = new Vector();
    this.visible = visible;
    this.opacity = opacity;
    this.zIndex = zIndex;
    this.scale = scale;
    this.origin = new Vector(originX, originY);
    this.rotation = rotation;
  }

  public isFullyVisible() {
    if (!this.parent || !this.visible) {
      return this.visible;
    }

    return !!this.findParent((drawable) => !drawable.visible);
  }

  public getFullPosition() {
    if (!this.parent) {
      return this.position;
    }

    const position = this.position.clone();
    this.traverseParents((drawable: this) => {
      position.addV(drawable.position);
    });

    return position;
  }

  public getFullOpacity() {
    if (!this.parent || this.opacity === 0) {
      return this.opacity;
    }

    let opacity = this.opacity;
    this.traverseParentsUntil((drawable) => {
      if (drawable.opacity >= 1) return false;

      opacity -= 1 - drawable.opacity;

      return opacity <= 0;
    });

    return Math.max(0, opacity);
  }

  public getFullZIndex() {
    if (!this.parent) {
      return this.zIndex;
    }

    let zIndex = this.zIndex;
    this.traverseParents((drawable) => {
      zIndex += drawable.zIndex;
    });

    return zIndex;
  }

  public update(deltaStep: number) {
    this.modifiers.forEach((modify) => {
      modify(this, deltaStep);
    });

    if (!this.velocity.isZero()) {
      const step = this.velocity.clone();
      step.scale(deltaStep);
      this.position.addV(step);
    }

    this.children.forEach((drawable) => {
      drawable.update(deltaStep);
    });
  }

  public draw() {
    this.layer.draw(this);

    this.children.forEach((drawable) => {
      drawable.draw();
    });
  }

  public destroy() {
    super.destroy();

    this.node instanceof HTMLNode && this.node.destroy();
    this.modifiers.clear();
  }
}
