import {
  Picture,
  createCanvas,
  createContext2D,
  type PictureOptions,
  type Sprite,
  createImage,
} from '@/core';
import { Colors } from '../../helpers';
import { ImageSpriteAsset } from '@/core/assets/types';

export enum InventoryItems {
  ROADKILL = 'roadkill',
  KNIFE = 'knife',
  BOMB = 'bomb',
  TEA = 'tea',
  SLAM = 'slam',
  SUPERHERO = 'superhero',
}

const slotOuterWidth = 24;
const slotOuterHeight = 24;

const slotInnerCell = {
  x: 3,
  y: 3,
  width: 18,
  height: 18,
};

const slotLayouts = [
  {
    color: Colors.white,
    x: 0,
    y: 0,
    width: slotOuterWidth,
    height: slotOuterHeight,
  },
  {
    color: Colors.black,
    x: 1,
    y: 1,
    width: 21,
    height: 22,
  },
  {
    color: Colors.dark,
    x: 22,
    y: 1,
    width: 1,
    height: 22,
  },
  {
    color: Colors.primary,
    ...slotInnerCell,
  },
];

const spriteCache = new Map<string, Sprite>();

interface Options
  extends Omit<
    PictureOptions,
    'color' | 'image' | 'onCreate' | 'flippable' | 'width' | 'height'
  > {
  spriteAsset: ImageSpriteAsset;
}

export class HudInventory<Items extends string> extends Picture {
  private readonly slotsCount = 3;
  private items: Items[] = [];

  constructor(options: Options) {
    super(options);

    this.setBottomLayout();
  }

  private async setBottomLayout() {
    const canvas = await this.createBottomLayout();
    const image = await createImage(canvas);

    this.setImage(image);
  }

  private async createBottomLayout() {
    const canvas = createCanvas(
      slotOuterWidth * this.scale * this.slotsCount,
      slotOuterHeight * this.scale
    );
    const context = createContext2D(canvas);

    let xOffset = 0;
    for (let i = 0; i < this.slotsCount; i++) {
      slotLayouts.forEach((layout) => {
        const { color, x, y, width, height } = layout;

        context.fillStyle = color;
        context.fillRect(
          Math.floor(x + xOffset),
          Math.floor(y),
          Math.floor(width * this.scale),
          Math.floor(height * this.scale)
        );
      });

      xOffset += slotOuterWidth * this.scale;
    }

    return canvas;
  }

  addItem(item: Items) {
    if (this.items.length === this.slotsCount) return;

    this.items.push(item);
  }

  hasItem(item: Items) {
    return this.items.includes(item);
  }

  removeItem(item: Items) {
    this.items = this.items.filter((i) => i !== item);
  }
}
