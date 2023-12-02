import { type Point } from '../../geometries';
import type { SpriteSource } from './common';

export interface ImageSpriteFrameBoundaries extends Point {
  w: number;
  h: number;
}

export type ImageSpriteFrameOffset = Point;

export interface ImageSpriteFrame<Custom = unknown> {
  frame: ImageSpriteFrameBoundaries;
  offset?: ImageSpriteFrameOffset;
  custom?: Custom;
}

type ImageSpriteFrames = Record<string, ImageSpriteFrame>;

export interface ImageSpriteData<
  Frames extends Record<string, ImageSpriteFrame> = ImageSpriteFrames
> {
  frames: {
    [Key in keyof Frames]: ImageSpriteFrame<Frames[Key]['custom']>;
  };
}

export interface ImageSpriteAsset<SpriteData> {
  image: HTMLImageElement;
  data: SpriteData;
}

export type ReturnImageAssets<Sources> = {
  [Key in keyof Sources]: Sources[Key] extends SpriteSource<ImageSpriteData>
    ? ImageSpriteAsset<ImageSpriteData<Sources[Key]['data']['frames']>>
    : HTMLImageElement;
};
