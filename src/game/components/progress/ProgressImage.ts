import {
  Vector,
  Image,
  type Layer,
  type Scene,
  delay,
  isEmpty,
} from '@/engine';
import { Progress } from './Progress';

interface Options {
  total: number;
  scene: Scene;
  layer: Layer;
  upperImage: HTMLImageElement;
  lowerImage: HTMLImageElement;
  centered?: boolean;
  position?: Vector;
  scale?: number;
  stepDelay?: number;
}

export class ProgressImage extends Progress {
  private readonly scene;
  private readonly lowerImage;
  private readonly upperImage;
  private readonly stepDelay;
  private currentPercentAsync = 0;
  private busy = false;

  constructor({
    scene,
    total,
    centered = false,
    layer,
    lowerImage,
    upperImage,
    position = new Vector(),
    scale = 1,
    stepDelay = 0,
  }: Options) {
    super(total, !!stepDelay);

    this.scene = scene;
    this.stepDelay = stepDelay;

    function onCreate(image: Image) {
      centered && image.centerHorizontally();
    }

    this.lowerImage = new Image({
      x: position.x,
      y: position.y,
      image: lowerImage,
      onCreate,
      scale,
      layer,
    });

    this.upperImage = new Image({
      x: position.x,
      y: position.y,
      image: upperImage,
      onCreate,
      scale,
      layer,
    });

    const isWidthsEqual =
      this.lowerImage.getWidth() === this.upperImage.getWidth();
    const isHeightsEqual =
      this.lowerImage.getHeight() === this.upperImage.getHeight();

    if (!isHeightsEqual || !isWidthsEqual) {
      throw Error('Image sizes should be equal');
    }

    this.scene.add(this.lowerImage);
    this.scene.add(this.upperImage);
  }

  protected updateSync(): void {
    const upperImageHeight =
      ((100 - this.progressPercent) * this.lowerImage.getHeight()) / 100;

    this.upperImage.setHeight(upperImageHeight);

    if (this.progressPercent === 100) {
      this.notify();
    }
  }

  protected async updateAsync(): Promise<void> {
    if (isEmpty(this.stack)) {
      return;
    }

    if (this.busy) return;

    this.busy = true;

    const targetPercent = this.stack.shift() as number;

    while (this.currentPercentAsync < targetPercent) {
      await delay(this.stepDelay);

      const upperImageHeight =
        ((100 - this.currentPercentAsync) * this.lowerImage.getHeight()) / 100;
      this.upperImage.setHeight(upperImageHeight);

      this.currentPercentAsync++;
    }

    this.busy = false;

    if (this.currentPercentAsync === 100) {
      this.notify();
      return;
    }

    this.updateAsync();
  }
}
