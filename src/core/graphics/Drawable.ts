import type { Entity } from '../entities';
import type { Layer } from './Layer';

export interface DrawableOptions {
  entity: Entity;
  layer: Layer;
  visible?: boolean;
  opacity?: number;
  zIndex?: number;
  shouldCreateNode?: boolean;
}

export interface RenderNode {
  destroy?(): void;
}

export abstract class Drawable {
  public readonly entity;
  public readonly layer;
  public node: RenderNode | null = null;
  public opacity;
  public visible;
  private _zIndex;
  public debug = false;

  constructor({
    entity,
    layer,
    zIndex = 0,
    visible = true,
    opacity = 1,
  }: DrawableOptions) {
    this.entity = entity;
    this.layer = layer;
    this.visible = visible;
    this.opacity = opacity;
    this._zIndex = zIndex;
  }

  public getGlobalZIndex() {
    if (!this.entity.getParent()) {
      return this._zIndex;
    }

    let zIndex = this._zIndex;
    this.entity.traverseParents((entity) => {
      if (!entity.drawable) return false;

      zIndex += entity.drawable._zIndex;
    });

    return zIndex;
  }

  public get zIndex() {
    return this._zIndex;
  }

  public set zIndex(n: number) {
    if (this._zIndex === n) return;

    this._zIndex = n;

    this.sortDrawableSiblingsByZIndex();
  }

  public sortDrawableSiblingsByZIndex() {
    const parent = this.entity.getParent();
    if (!parent) return;

    const prev = this.entity.getPreviousSibling();
    if (prev?.drawable && prev.drawable._zIndex <= this._zIndex) return;

    parent.getChildren().sort((a, b) => b.drawable._zIndex - a._zIndex);
  }

  public isGloballyVisible() {
    if (!this.entity.getParent() || !this.visible) {
      return this.visible;
    }

    return !!this.entity.findParent((entity) =>
      entity.drawable ? entity.drawable.visible : false
    );
  }

  public getGlobalOpacity() {
    if (!this.entity.getParent() || this.opacity === 0) {
      return this.opacity;
    }

    let opacity = this.opacity;
    this.entity.traverseParents((entity) => {
      if (!entity.drawable) return false;

      opacity *= entity.drawable.opacity;
    });

    return opacity;
  }

  public draw() {
    this.layer.draw(this);
  }

  public destroy() {
    this.node?.destroy?.();
  }
}
