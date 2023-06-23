import type { Drawable } from './Drawable';
import type { Layer } from './layers/Layer';

export class Scene {
  private readonly drawables: Map<Drawable, Drawable> = new Map();
  private readonly layers: Map<Layer, Layer> = new Map();

  public add(drawable: Drawable): Scene {
    this.drawables.set(drawable, drawable);

    const layer = drawable.getLayer();
    this.layers.set(layer, layer);

    return this;
  }

  public remove(drawable: Drawable): Scene {
    drawable.destroy();
    this.drawables.delete(drawable);

    const layer = drawable.getLayer();
    if (!this.countDrawablesUsingLayer(layer)) {
      this.layers.delete(layer);
    }

    return this;
  }

  private countDrawablesUsingLayer(layer: Layer): number {
    let count = 0;

    this.drawables.forEach((drawable) => {
      drawable.getLayer() === layer && count++;
    });

    return count;
  }

  public clear(): Scene {
    this.drawables.forEach((drawable) => {
      drawable.destroy();
    });
    this.drawables.clear();
    this.layers.clear();

    return this;
  }

  public update(step: number): void {
    this.drawables.forEach((drawable) => {
      drawable.update(step);
    });
  }

  public draw(): void {
    this.layers.forEach((layer) => {
      layer.preDraw();
    });

    this.drawables.forEach((drawable) => {
      drawable.draw();
    });

    this.layers.forEach((layer) => {
      layer.postDraw();
    });
  }
}
