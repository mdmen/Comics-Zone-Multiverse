import { Vector, Image, type Layer, type Scene } from '@/engine';
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
}

export class ProgressImage extends Progress {
  private readonly scene;
  private readonly lowerImage;
  private readonly upperImage;

  constructor({
    scene,
    total,
    centered = false,
    layer,
    lowerImage,
    upperImage,
    position = new Vector(),
    scale = 1,
  }: Options) {
    super(total);

    this.scene = scene;

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

  public update(): void {
    super.update();

    const upperImageHeight =
      ((100 - this.progressPercent) * this.lowerImage.getHeight()) / 100;

    this.upperImage.setHeight(upperImageHeight);
  }
}
