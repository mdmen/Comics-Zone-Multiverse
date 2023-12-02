import { Drawable, type Updatable } from './render';
import { type Layer } from './render/layers/Layer';

type SceneItem = Updatable | Drawable;

export class Scene {
  protected readonly items: Set<SceneItem> = new Set();
  private readonly layers: Set<Layer> = new Set();

  private hasUpdatablesUsingLayer(layer: Layer) {
    for (const item of this.items) {
      if (item instanceof Drawable && item.getLayer() === layer) return true;
    }

    return false;
  }

  add(updatable: SceneItem) {
    this.items.add(updatable);

    if (updatable instanceof Drawable) {
      const layer = updatable.getLayer();
      this.layers.add(layer);
    }

    return this;
  }

  remove(updatable: Updatable) {
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

  destroy() {
    this.items.forEach((item) => {
      item.destroy();
    });

    this.layers.forEach((layer) => {
      layer.clear();
    });
    this.layers.clear();

    return this;
  }

  update(step: number) {
    this.items.forEach((item) => {
      item.update(step);
    });
  }

  draw() {
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
