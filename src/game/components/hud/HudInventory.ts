import {
  Image,
  Updatable,
  createCanvas,
  type UpdatableOptions,
  createContext2D,
  extractImageFromCanvas,
  type Layer,
} from '@/engine';
import { type Manager } from '@/game/Manager';
import {
  type HudLayout,
  outerBorderColor,
  innerBorderColor,
  innerAccentColor,
  backgroundColor,
  scaleLayout,
} from './layout';

const slotOuterWidth = 24;
const slotOuterHeight = 24;
const slotInnerXOffset = 3;
const slotInnerYOffset = 3;
const slotInnerWidth = 18;
const slotInnerHeight = 18;

const slotLayouts: HudLayout[] = [
  {
    color: outerBorderColor,
    x: 0,
    y: 0,
    width: slotOuterWidth,
    height: slotOuterHeight,
  },
  {
    color: innerBorderColor,
    x: 1,
    y: 1,
    width: 21,
    height: 22,
  },
  {
    color: innerAccentColor,
    x: 22,
    y: 1,
    width: 1,
    height: 22,
  },
  {
    color: backgroundColor,
    x: slotInnerXOffset,
    y: slotInnerYOffset,
    width: slotInnerWidth,
    height: slotInnerHeight,
  },
];

export enum InventoryItems {
  RAT = 'rat',
  KNIFE = 'knife',
  BOMB = 'bomb',
  DRINK = 'drink',
  FIST = 'fist',
}

interface Options extends UpdatableOptions {
  manager: Manager;
  layer: Layer;
  scale?: number;
}

export class HudInventory extends Updatable {
  private readonly manager;
  private readonly items: InventoryItems[] = [];
  private readonly slotsCount = 3;
  private scale;

  constructor({ manager, layer, scale = 1, ...options }: Options) {
    super(options);

    this.manager = manager;
    this.scale = scale;

    this.setBottomLayout(layer);
  }

  private async setBottomLayout(layer: Layer): Promise<void> {
    const image = await this.generateSlotsImage();
    const bottomLayout = new Image({
      layer,
      image,
    });

    this.addChild(bottomLayout);
  }

  private async generateSlotsImage(): Promise<HTMLImageElement> {
    const canvas = createCanvas(
      slotOuterWidth * this.scale * this.slotsCount,
      slotOuterHeight * this.scale
    );
    const context = createContext2D(canvas);
    let xOffset = 0;

    for (let i = 0; i < this.slotsCount; i++) {
      slotLayouts.forEach((layout) => {
        const { color, x, y, width, height } = scaleLayout(layout, this.scale);

        context.fillStyle = color;
        context.fillRect(x + xOffset, y, width, height);
      });

      xOffset += Math.floor(slotOuterWidth * this.scale);
    }

    return extractImageFromCanvas(canvas);
  }
}
