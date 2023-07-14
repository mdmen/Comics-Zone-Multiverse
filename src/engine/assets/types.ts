export interface SpriteSource {
  src: string;
  data: string;
}

export interface SpriteResource<Data> {
  src: string;
  data: Data;
}

export interface SpriteAsset<Data> {
  image: HTMLImageElement;
  data: Data;
}
