import { Drawable, type Updatable } from './render';
import { type Layer } from './render/layers/Layer';

type SceneItem = Updatable | Drawable;

export class Scene {
  protected readonly items: Set<SceneItem> = new Set();
  private readonly layers: Set<Layer> = new Set();

  private hasUpdatablesUsingLayer(layer: Layer): boolean {
    for (const item of this.items) {
      if (item instanceof Drawable && item.getLayer() === layer) return true;
    }

    return false;
  }

  public add(updatable: SceneItem): Scene {
    this.items.add(updatable);

    if (updatable instanceof Drawable) {
      const layer = updatable.getLayer();
      this.layers.add(layer);
    }

    return this;
  }

  public remove(updatable: Updatable): Scene {
    updatable.destroy();
    this.items.delete(updatable);

    if (updatable instanceof Drawable) {
      const layer = updatable.getLayer();
      if (!this.hasUpdatablesUsingLayer(layer)) {
        this.layers.delete(layer);
      }
    }

    return this;
  }

  public destroy(): Scene {
    this.items.forEach((item) => {
      item.destroy();
    });

    this.layers.forEach((layer) => {
      layer.clear();
    });
    this.layers.clear();

    return this;
  }

  public update(step: number): void {
    this.items.forEach((item) => {
      item.update(step);
    });
  }

  public draw(): void {
    this.layers.forEach((layer) => {
      layer.preDraw();
    });

    this.items.forEach((item) => {
      item.draw();
    });

    this.layers.forEach((layer) => {
      layer.postDraw();
    });
  }
}
