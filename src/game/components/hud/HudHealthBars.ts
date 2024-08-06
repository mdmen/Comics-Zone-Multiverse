import {
  Picture,
  createCanvas,
  createContext2D,
  type PictureOptions,
  createImage,
} from '@/core';
import { Colors } from '../../helpers';
import { ProgressBar } from '../progress';

const heroBarLayout = {
  x: 3,
  y: 3,
  width: 66,
  height: 5,
};

const enemyBarLayout = {
  x: 3,
  y: 9,
  width: 66,
  height: 5,
};

const outerWidth = 72;
const outerHeight = 17;

const bottomLayouts = [
  {
    color: Colors.white,
    x: 0,
    y: 0,
    width: outerWidth,
    height: outerHeight,
  },
  {
    color: Colors.black,
    x: 1,
    y: 1,
    width: 70,
    height: 15,
  },
  {
    color: Colors.dark,
    x: 3,
    y: 2,
    width: 67,
    height: 11,
  },
  {
    color: Colors.primary,
    ...heroBarLayout,
  },
  {
    color: Colors.primary,
    ...enemyBarLayout,
  },
];

interface Options
  extends Omit<
    PictureOptions,
    'onCreate' | 'flippable' | 'image' | 'color' | 'width' | 'height'
  > {
  heroProgressBar: ProgressBar;
  enemyProgressBar: ProgressBar;
}

export class HudHealthBars extends Picture {
  private heroProgressBar;
  private enemyProgressBar;

  constructor({ heroProgressBar, enemyProgressBar, ...options }: Options) {
    super(options);

    heroProgressBar.setTotalWidth(heroBarLayout.width * this.scale);
    enemyProgressBar.setTotalWidth(enemyBarLayout.width * this.scale);

    const heroBar = heroProgressBar.getBar();
    const enemyBar = enemyProgressBar.getBar();

    heroBar.setHeight(heroBarLayout.height * this.scale);
    heroBar.setPosition(heroBarLayout.x, heroBarLayout.y);

    enemyBar.setHeight(enemyBarLayout.height * this.scale);
    enemyBar.setPosition(enemyBarLayout.x, enemyBarLayout.y);

    this.addChild(heroBar);
    this.addChild(enemyBar);

    this.heroProgressBar = heroProgressBar;
    this.enemyProgressBar = enemyProgressBar;

    this.setBottomLayout();
  }

  private async setBottomLayout() {
    const canvas = await this.createBottomLayout();
    const image = await createImage(canvas);

    this.setImage(image);
  }

  private async createBottomLayout() {
    const canvas = createCanvas(
      outerWidth * this.scale,
      outerHeight * this.scale
    );
    const context = createContext2D(canvas);

    bottomLayouts.forEach((layout) => {
      const { color, x, y, width, height } = layout;

      context.fillStyle = color;
      context.fillRect(
        Math.floor(x),
        Math.floor(y),
        Math.floor(width * this.scale),
        Math.floor(height * this.scale)
      );
    });

    return canvas;
  }
}
