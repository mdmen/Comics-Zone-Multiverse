import { isDOMEngine } from '../utils';
import { type Layer } from './layers/Layer';
import { type DrawableNode } from './nodes';
import { Updatable, type UpdatableOptions } from './Updatable';

export interface DrawableOptions extends UpdatableOptions {
  layer: Layer;
}

export abstract class Drawable extends Updatable {
  protected readonly layer;
  protected readonly domNode;

  constructor({ layer, ...options }: DrawableOptions) {
    super(options);

    this.layer = layer;
    this.domNode = isDOMEngine() ? this.createDomNode() : null;
  }

  public centerHorizontally(): void {
    const x = this.layer.getWidth() / 2 - this.width / 2;
    this.position.x = x;
  }

  public getLayer(): Layer {
    return this.layer;
  }

  public getDomNode(): DrawableNode | null {
    return this.domNode;
  }

  public destroy(): void {
    return;
  }

  protected abstract createDomNode(): DrawableNode;

  public abstract draw(): void;
}
