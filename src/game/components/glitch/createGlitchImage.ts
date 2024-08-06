import { type PictureOptions, Settings } from '@/core';
import { GlitchImageCanvas } from './GlitchImageCanvas';
import { GlitchImageDOM } from './GlitchImageDOM';

export function createGlitchImage(options: PictureOptions) {
  return Settings.isHTMLRenderEngine()
    ? new GlitchImageDOM(options)
    : new GlitchImageCanvas(options);
}
