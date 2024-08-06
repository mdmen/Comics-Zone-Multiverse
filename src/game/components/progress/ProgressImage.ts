import { type Picture } from '@/core';
import { Progress } from './Progress';

interface Options {
  lowerPicture: Picture;
  upperPicture: Picture;
  total: number;
  delay?: number;
}

export class ProgressImage extends Progress {
  private lowerPicture;
  private upperPicture;

  constructor({ total, lowerPicture, upperPicture, delay }: Options) {
    super(total, delay);

    this.lowerPicture = lowerPicture;
    this.upperPicture = upperPicture;

    this.checkImagesSizes();
    this.reset();
  }

  private checkImagesSizes() {
    const isWidthsEqual =
      this.lowerPicture.getWidth() === this.upperPicture.getWidth();
    const isHeightsEqual =
      this.lowerPicture.getHeight() === this.upperPicture.getHeight();

    if (!isHeightsEqual || !isWidthsEqual) {
      throw Error('Sizes of progress images should be equal');
    }
  }

  protected async updateVisually() {
    const upperImageHeight =
      ((100 - this.progressPercent) * this.lowerPicture.getHeight()) / 100;
    this.upperPicture.setHeight(upperImageHeight);
  }

  reset() {
    super.reset();

    const height = this.lowerPicture.getHeight();
    this.upperPicture.setHeight(height);
  }
}
