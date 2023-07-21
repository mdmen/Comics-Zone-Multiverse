import { Pendulum } from '../Pendulum';
import { isDOMEngine } from '../utils';
import { type Layer } from './layers/Layer';
import { type DrawableNode } from './nodes';
import { Updatable, type UpdatableOptions } from './Updatable';

export interface DrawableOptions extends UpdatableOptions {
  layer: Layer;
  flicker?: number;
}

export abstract class Drawable extends Updatable {
  protected readonly layer;
  protected readonly domNode;
  protected visible = true;
  protected opacity = 1;
  private flicker;

  constructor({ layer, flicker = 0, ...options }: DrawableOptions) {
    super(options);

    this.layer = layer;
    this.flicker = flicker ? new Pendulum({ velocity: flicker }) : null;
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

  public hide(): void {
    this.visible = false;
  }

  public show(): void {
    this.visible = true;
  }

  public isVisible(): boolean {
    return this.visible;
  }

  public getOpacity(): number {
    return this.opacity;
  }

  public update(step: number): void {
    super.update(step);

    if (this.flicker) {
      this.flicker.update(step);
      this.opacity = this.flicker.getValue();
    }
  }

  public destroy(): void {
    return;
  }

  protected abstract createDomNode(): DrawableNode;

  public abstract draw(): void;
}
