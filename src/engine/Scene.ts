import { Drawable } from './render';
import { type Layer } from './render/layers/Layer';

export class Scene {
  protected readonly items: Set<Drawable> = new Set();
  private readonly layers: Set<Layer> = new Set();

  private hasItemsUsingLayer(layer: Layer) {
    for (const item of this.items) {
      if (item.getLayer() === layer) return true;
    }

    return false;
  }

  add(drawable: Drawable) {
    this.items.add(drawable);

    const layer = drawable.getLayer();
    this.layers.add(layer);

    return this;
  }

  remove(drawable: Drawable) {
    const layer = drawable.getLayer();
    if (!this.hasItemsUsingLayer(layer)) {
      this.layers.delete(layer);
    }

    drawable.destroy();
    this.items.delete(drawable);

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
      if (!layer.shouldSyncWithCamera()) return;

      layer.syncWithCamera();
      layer.updatePrevPosition();
    });

    this.items.forEach((item) => {
      item.draw();
    });
  }
}
