import type { SoundLayer } from './SoundLayer';
import { Observable } from '../Observable';
import { SoundEvents } from './SoundEvents';
import { Logger } from '../Logger';

export abstract class SoundSource {
  protected sourceNode;
  public readonly events = new Observable<SoundEvents>();
  protected readonly logger = Logger.getInstance();

  constructor(buffer: AudioBuffer, layer: SoundLayer) {
    const context = layer.getContext();
    const sourceNode = new AudioBufferSourceNode(context, { buffer });

    sourceNode.connect(layer.getGainNode());
    sourceNode.addEventListener('ended', this.stopPlayingNotify);

    this.sourceNode = sourceNode;
  }

  protected startPlayingNotify = () => {
    this.events.notify(SoundEvents.Start);
  };

  protected stopPlayingNotify = () => {
    this.events.notify(SoundEvents.Stop);
  };

  public stop() {
    try {
      this.sourceNode.stop();
    } catch (error) {
      this.logger.error(error);
    }
  }

  public destroy() {
    this.stop();

    this.sourceNode.removeEventListener('ended', this.stopPlayingNotify);
    this.sourceNode.disconnect();
    this.sourceNode = null as unknown as AudioBufferSourceNode;

    this.events.unsubscribeAll();
  }
}
