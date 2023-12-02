import { Picture } from '@/engine';

export class GlitchImageDOM extends Picture {
  start() {
    const node = this.domNode.getNode();
    node.classList.add('glitch');
  }

  stop() {
    const node = this.domNode.getNode();
    node.classList.remove('glitch');
  }
}
