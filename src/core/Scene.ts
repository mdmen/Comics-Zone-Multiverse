import type { Drawable, Layer } from './graphics';
import type { State } from './state';

export class Scene implements State {
  private readonly items = new Set<Drawable>();
  private readonly layers = new Set<Layer>();

  private hasItemsUsingLayer(layer: Layer) {
    for (const item of this.items) {
      if (item.layer === layer) return true;
    }

    return false;
  }

  public add(drawable: Drawable) {
    this.items.add(drawable);
    this.layers.add(drawable.layer);

    return this;
  }

  public remove(drawable: Drawable) {
    drawable.destroy();
    this.items.delete(drawable);

    if (!this.hasItemsUsingLayer(drawable.layer)) {
      this.layers.delete(drawable.layer);
    }

    return this;
  }

  public update(step: number) {
    this.items.forEach((item) => {
      item.update(step);
    });
  }

  public draw() {
    this.layers.forEach((layer) => {
      layer.clear();

      if (!layer.shouldSyncWithCamera()) return;

      layer.syncWithCamera();
      layer.updatePrevPosition();
    });

    this.items.forEach((item) => {
      item.draw();
    });
  }

  public destroy() {
    this.items.forEach((item) => {
      item.destroy();
    });

    this.layers.forEach((layer) => {
      layer.clear();
    });
    this.layers.clear();
  }
}
