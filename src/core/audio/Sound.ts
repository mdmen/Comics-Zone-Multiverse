import type { SoundLayer } from './SoundLayer';
import { Observable } from '../Observable';
import { SoundEvents } from './SoundEvents';

export class Sound {
  protected node;
  public readonly events = new Observable<SoundEvents>();

  constructor(buffer: AudioBuffer, layer: SoundLayer) {
    const context = layer.getContext();
    const node = new AudioBufferSourceNode(context, { buffer });

    node.connect(layer.getGainNode());
    node.addEventListener('ended', this.stopPlayingNotify);

    this.node = node;
  }

  protected startPlayingNotify = () => {
    this.events.notify(SoundEvents.Start);
  };

  protected stopPlayingNotify = () => {
    this.events.notify(SoundEvents.End);
  };

  public play() {
    this.node.start();

    this.startPlayingNotify();
  }

  public setLoop(loop: boolean) {
    this.node.loop = loop;
  }

  public stop() {
    this.node.stop();
  }

  public destroy() {
    this.stop();

    this.node.removeEventListener('ended', this.stopPlayingNotify);
    this.node.disconnect();
    this.node = null as unknown as AudioBufferSourceNode;
    this.events.unsubscribeAll();
  }
}
