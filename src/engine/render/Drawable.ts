import { Settings } from '../Settings';
import { type Layer } from './layers/Layer';
import { type DrawableNode } from './nodes';
import { Updatable, type UpdatableOptions } from './Updatable';

interface Modifier {
  update(drawable: Drawable, step: number): void;
}

export interface DrawableOptions extends UpdatableOptions {
  layer: Layer;
  classList?: string[];
}

export abstract class Drawable extends Updatable {
  protected readonly layer;
  protected readonly domNode;
  protected readonly modifiers = new Set<Modifier>();
  protected visible = true;
  protected opacity = 1;

  constructor({ layer, classList = [], ...options }: DrawableOptions) {
    super(options);

    this.layer = layer;
    this.domNode = Settings.isDOMEngine() ? this.createDomNode() : null;

    this.domNode?.getNode().classList.add(...classList);
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

  public setOpacity(value: number): void {
    if (value < 0 || value > 1) {
      throw Error(`${value} is incorrect opacity value`);
    }

    this.opacity = value;
  }

  public addModifier(modifier: Modifier): void {
    this.modifiers.add(modifier);
  }

  public deleteModifier(modifier: Modifier): void {
    this.modifiers.delete(modifier);
  }

  public update(step: number): void {
    super.update(step);

    this.modifiers.forEach((modifier) => {
      modifier.update(this, step);
    });
  }

  public destroy(): void {
    this.domNode?.destroy();
    this.modifiers.clear();
  }

  protected abstract createDomNode(): DrawableNode;

  public abstract draw(): void;
}
