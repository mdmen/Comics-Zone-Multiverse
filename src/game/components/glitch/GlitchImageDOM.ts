import { Picture } from '@/core';

export class GlitchImageDOM extends Picture {
  start() {
    if (!this.domNode) return;

    const node = this.domNode.getNode();
    node.classList.add('glitch');
  }

  stop() {
    if (!this.domNode) return;

    const node = this.domNode.getNode();
    node.classList.remove('glitch');
  }
}
