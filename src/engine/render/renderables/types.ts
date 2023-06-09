import type { BaseLayer } from '../layers/BaseLayer';

export interface RenderableOptions {
  layer: BaseLayer;
  image: HTMLImageElement;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  selfClear?: boolean;
  canFlip?: boolean;
}

export interface SpriteOptions extends RenderableOptions {
  data?: Record<string, unknown>;
}

export type SpriteImages = Record<'straight' | 'reversed', HTMLImageElement>;
