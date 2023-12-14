import { Updatable, type Layer, type Scene } from '@/engine';
import { HudHealthBar } from './HudHealthBar';
import { HudInventory } from './HudInventory';
import { type SceneManager } from '@/game/scenes/SceneManager';

interface Options {
  scene: Scene;
  manager: SceneManager;
  layer: Layer;
  scale?: number;
  x?: number;
  y?: number;
  health?: number;
}

export class Hud extends Updatable {
  private healthBar;
  private inventory;

  constructor({
    x,
    y,
    scale = 1,
    health = 100,
    scene,
    layer,
    manager,
  }: Options) {
    super({ x, y });

    this.healthBar = new HudHealthBar({
      y: 77,
      layer,
      health,
      scale,
    });
    this.inventory = new HudInventory({
      layer,
      scale,
      manager,
    });

    this.addChild(this.healthBar);
    this.addChild(this.inventory);

    scene.add(this);
  }
}
