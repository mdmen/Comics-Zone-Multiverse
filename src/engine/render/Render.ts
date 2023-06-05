import { defaultRender } from '../settings';
import { DOMLayer } from './layers/DOMLayer';
import { CanvasLayer } from './layers/CanvasLayer';

type RenderType = 'canvas' | 'dom';

interface Options {
  render?: RenderType;
}

interface DrawOptions {
  render?: RenderType;
}

export class Render {
  private layer;

  constructor({ render = defaultRender }: Options = {}) {
    this.layer = this.shouldUseCanvas(render)
      ? new CanvasLayer()
      : new DOMLayer();
  }

  private shouldUseCanvas(render: RenderType): boolean {
    return render === 'canvas';
  }

  public draw(options: DrawOptions): void {
    throw Error('Not initialized');
  }

  public clear(): void {
    throw Error('Not initialized');
  }

  public getLayer() {
    return this.layer;
  }
}
