import { type Layer, type Scene, Drawable } from '@/core';
import { HudHealthBar } from './HudHealthBars';
import { HudInventory } from './HudInventory';
import { type Manager } from '@/game/Manager';

interface Options {
  scene: Scene;
  manager: Manager;
  layer: Layer;
  scale?: number;
  x?: number;
  y?: number;
  health?: number;
}

export class Hud extends Drawable {
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
    super({ x, y, width: 0, height: 0, layer });

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
