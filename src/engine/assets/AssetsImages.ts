import { Assets } from './Assets';
import { loadImage } from '../utils';

type ReturnAssets<Sources> = Promise<Record<keyof Sources, HTMLImageElement>>;

export class AssetsImages<
  Sources extends Record<string, string>
> extends Assets {
  constructor(sources: Sources) {
    super(sources);
  }

  protected loadAsset(src: string): Promise<HTMLImageElement> {
    return loadImage(src);
  }

  public async get(): ReturnAssets<Sources> {
    return (await this.retrieve()) as ReturnAssets<Sources>;
  }
}
