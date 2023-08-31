import { Updatable, type Layer, type Scene } from '@/engine';
import { HudHealthBar } from './HudHealthBar';

interface Options {
  scene: Scene;
  layer: Layer;
  scale?: number;
  x?: number;
  y?: number;
  health?: number;
}

export class Hud extends Updatable {
  private healthBar;
  private scene;

  constructor({ x, y, scale = 1, health = 100, scene, layer }: Options) {
    super({ x, y });

    this.scene = scene;

    this.healthBar = new HudHealthBar({
      layer,
      health,
      scale,
    });

    this.addChild(this.healthBar);

    this.scene.add(this);
  }
}
