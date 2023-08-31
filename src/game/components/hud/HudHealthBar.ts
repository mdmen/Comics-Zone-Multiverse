import {
  Image,
  type Layer,
  createCanvas,
  createContext2D,
  extractImageFromCanvas,
  Updatable,
  type UpdatableOptions,
  RectShape,
  Rectangle,
} from '@/engine';
import {
  outerBorderColor,
  innerBorderColor,
  innerAccentColor,
  backgroundColor,
  progressBarColor,
} from './constants';

interface Layout {
  color: string;
  rect: Rectangle;
}

const outerWidth = 72;
const outerHeight = 11;

const bottomLayouts: Layout[] = [
  {
    color: outerBorderColor,
    rect: new Rectangle(0, 0, outerWidth, outerHeight),
  },
  {
    color: innerBorderColor,
    rect: new Rectangle(1, 1, 70, 9),
  },
  {
    color: innerAccentColor,
    rect: new Rectangle(3, 2, 67, 7),
  },
  {
    color: backgroundColor,
    rect: new Rectangle(3, 3, 66, 5),
  },
];

const progressBarLayout = {
  color: progressBarColor,
  rect: new Rectangle(3, 3, 37, 5),
};

interface Options extends UpdatableOptions {
  layer: Layer;
  health?: number;
  scale?: number;
}

export class HudHealthBar extends Updatable {
  private health;
  private scale;
  private progressBar!: RectShape;

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
    const layout = new Image({
      image,
      layer,
    });

    this.addChild(layout);
  }

  private setProgressBar(layer: Layer): void {
    const { color, rect } = progressBarLayout;
    const position = rect.getPosition();

    this.progressBar = new RectShape({
      layer,
      color,
      x: Math.floor(position.x * this.scale),
      y: Math.floor(position.y * this.scale),
      width: Math.floor(rect.getWidth() * this.scale),
      height: Math.floor(rect.getHeight() * this.scale),
    });
    this.addChild(this.progressBar);
  }

  private async generateBottomLayoutImage(): Promise<HTMLImageElement> {
    const canvas = createCanvas(
      outerWidth * this.scale,
      outerHeight * this.scale
    );
    const context = createContext2D(canvas);

    bottomLayouts.forEach(({ color, rect }) => {
      const position = rect.getPosition();
      const posX = Math.floor(position.x * this.scale);
      const posY = Math.floor(position.y * this.scale);
      const finalWidth = Math.floor(rect.getWidth() * this.scale);
      const finalHeight = Math.floor(rect.getHeight() * this.scale);

      context.fillStyle = color;
      context.fillRect(posX, posY, finalWidth, finalHeight);
    });

    return extractImageFromCanvas(canvas);
  }
}
