import type { Layer } from './layers/Layer';

interface Updatable {
  update(step: number): void;
  draw(): void;
  destroy(): void;
  getLayer(): Layer;
}

export class Scene {
  private readonly updatables: Map<Updatable, Updatable> = new Map();
  private readonly layers: Map<Layer, Layer> = new Map();

  public add(updatable: Updatable): Scene {
    this.updatables.set(updatable, updatable);

    const layer = updatable.getLayer();
    this.layers.set(layer, layer);

    return this;
  }

  public remove(updatable: Updatable): Scene {
    updatable.destroy();
    this.updatables.delete(updatable);

    const layer = updatable.getLayer();
    if (!this.countUpdatablesUsingLayer(layer)) {
      this.layers.delete(layer);
    }

    return this;
  }

  private countUpdatablesUsingLayer(layer: Layer): number {
    let count = 0;

    this.updatables.forEach((updatable) => {
      updatable.getLayer() === layer && count++;
    });

    return count;
  }

  public clear(): Scene {
    this.updatables.forEach((updatable) => {
      updatable.destroy();
    });
    this.updatables.clear();
    this.layers.clear();

    return this;
  }

  public update(step: number): void {
    this.updatables.forEach((updatable) => {
      updatable.update(step);
    });
  }

  public draw(): void {
    this.layers.forEach((layer) => {
      layer.preDraw();
    });

    this.updatables.forEach((updatable) => {
      updatable.draw();
    });

    this.layers.forEach((layer) => {
      layer.postDraw();
    });
  }
}
