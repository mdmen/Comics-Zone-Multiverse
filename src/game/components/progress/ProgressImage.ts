import { Picture, type PictureOptions, type Scene } from '@/engine';
import { Progress } from './Progress';

interface Options extends PictureOptions {
  total: number;
  scene: Scene;
  upperImage: HTMLImageElement;
  delay?: number;
}

export class ProgressImage extends Progress {
  private readonly scene;
  private readonly lowerImage;
  private readonly upperImage;

  constructor({ scene, total, image, upperImage, delay, ...options }: Options) {
    super(total, delay);

    this.scene = scene;

    this.lowerImage = new Picture({ ...options, image });
    this.upperImage = new Picture({ ...options, image: upperImage });

    this.checkImagesSizes();

    this.scene.add(this.lowerImage);
    this.scene.add(this.upperImage);
  }

  private checkImagesSizes() {
    const isWidthsEqual =
      this.lowerImage.getWidth() === this.upperImage.getWidth();
    const isHeightsEqual =
      this.lowerImage.getHeight() === this.upperImage.getHeight();

    if (!isHeightsEqual || !isWidthsEqual) {
      throw Error('Sizes of progress images should be equal');
    }
  }

  protected async updateVisually() {
    const upperImageHeight =
      ((100 - this.currentPercentAsync) * this.lowerImage.getHeight()) / 100;
    this.upperImage.setHeight(upperImageHeight);
  }
}
