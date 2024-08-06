import { Size, Vector } from './geometry';

export interface WorldOptions {
  size?: Size;
}

export class World {
  public readonly position = new Vector(0, 0);
  public readonly size;

  constructor({ size = new Size() }: WorldOptions) {
    this.size = size;
  }
}
