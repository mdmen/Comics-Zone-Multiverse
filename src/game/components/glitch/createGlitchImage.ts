import { type PictureOptions, Settings } from '@/engine';
import { GlitchImageCanvas } from './GlitchImageCanvas';
import { GlitchImageDOM } from './GlitchImageDOM';

interface Options extends PictureOptions {
  delayMin?: number;
  delayMax?: number;
}

export function createGlitchImage(options: Options) {
  return Settings.isDOMEngine()
    ? new GlitchImageDOM(options)
    : new GlitchImageCanvas(options);
}
