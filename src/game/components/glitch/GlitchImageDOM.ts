import { Image } from '@/engine';

export class GlitchImageDOM extends Image {
  public start(): void {
    const node = this.domNode.getNode();
    node.classList.add('glitch');
  }

  public stop(): void {
    const node = this.domNode.getNode();
    node.classList.remove('glitch');
  }
}
