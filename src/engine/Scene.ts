import type { Layer } from './render/layers/Layer';
import { type GroupUpdatable, Group } from './render/Group';

interface Updatable extends GroupUpdatable {
  getLayer(): Layer;
}

export class Scene extends Group<Updatable> {
  private readonly layers: Set<Layer> = new Set();

  public add(updatable: Updatable): Scene {
    super.add(updatable);

    const layer = updatable.getLayer();
    this.layers.add(layer);

    return this;
  }

  public remove(updatable: Updatable): Scene {
    super.remove(updatable);

    const layer = updatable.getLayer();
    if (!this.hasUpdatablesUsingLayer(layer)) {
      this.layers.delete(layer);
    }

    return this;
  }

  private hasUpdatablesUsingLayer(layer: Layer): boolean {
    for (const updatable of this.updatables) {
      if (updatable.getLayer() === layer) return true;
    }

    return false;
  }

  public clear(): Scene {
    super.clear();
    this.layers.clear();

    return this;
  }

  public draw(): void {
    this.layers.forEach((layer) => {
      layer.preDraw();
    });

    super.draw();

    this.layers.forEach((layer) => {
      layer.postDraw();
    });
  }
}
