import {
  Picture,
  type Layer,
  createCanvas,
  createContext2D,
  extractImageFromCanvas,
  Updatable,
  type UpdatableOptions,
  Rect,
} from '@/engine';
import {
  scaleLayout,
  type HudLayout,
  outerBorderColor,
  innerBorderColor,
  innerAccentColor,
  backgroundColor,
  progressBarColor,
} from './layout';

const outerWidth = 72;
const outerHeight = 11;

const bottomLayouts: HudLayout[] = [
  {
    color: outerBorderColor,
    x: 0,
    y: 0,
    width: outerWidth,
    height: outerHeight,
  },
  {
    color: innerBorderColor,
    x: 1,
    y: 1,
    width: 70,
    height: 9,
  },
  {
    color: innerAccentColor,
    x: 3,
    y: 2,
    width: 67,
    height: 7,
  },
  {
    color: backgroundColor,
    x: 3,
    y: 3,
    width: 66,
    height: 5,
  },
];

const progressBarLayout = {
  color: progressBarColor,
  x: 3,
  y: 3,
  width: 37,
  height: 5,
};

interface Options extends UpdatableOptions {
  layer: Layer;
  health?: number;
  scale?: number;
}

export class HudHealthBar extends Updatable {
  private health;
  private scale;
  private progressBar!: Rect;

  constructor({ layer, health = 100, scale = 1, ...options }: Options) {
    super(options);

    this.health = health;
    this.scale = scale;

    this.addLayouts(layer);
  }

  private async addLayouts(layer: Layer): Promise<void> {
    await this.setBottomLayout(layer);
    this.setProgressBar(layer);
  }

  private async setBottomLayout(layer: Layer): Promise<void> {
    const image = await this.generateBottomLayoutImage();
    const layout = new Picture({
      image,
      layer,
    });

    this.addChild(layout);
  }

  private setProgressBar(layer: Layer) {
    this.progressBar = new Rect({
      layer,
      ...scaleLayout(progressBarLayout, this.scale),
    });

    this.addChild(this.progressBar);
  }

  private async generateBottomLayoutImage(): Promise<HTMLImageElement> {
    const canvas = createCanvas(
      outerWidth * this.scale,
      outerHeight * this.scale
    );
    const context = createContext2D(canvas);

    bottomLayouts.forEach((layout) => {
      const { color, x, y, width, height } = scaleLayout(layout, this.scale);

      context.fillStyle = color;
      context.fillRect(x, y, width, height);
    });

    return extractImageFromCanvas(canvas);
  }

  setHealth(value: number) {
    this.health = value;
  }

  getHealth(): number {
    return this.health;
  }
}
