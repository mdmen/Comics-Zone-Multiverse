import { Logger } from '../Logger';
import { isEmpty } from '../utils';

type Sources = Record<string, unknown>;
type Resources = Sources;

export abstract class Assets {
  public async load(
    sources: Sources,
    onProgress = () => {}
  ): Promise<Resources> {
    const assets = {} as Resources;

    try {
      const names = Object.keys(sources);

      if (isEmpty(names)) {
        throw Error('There is nothing to load');
      }

      await Promise.all(
        names.map(async (key) => {
          const source = sources[key];
          const asset = await this.loadAsset(source);

          onProgress();

          assets[key] = asset;
        })
      );
    } catch (error) {
      Logger.error(error);
    }

    return assets;
  }

  protected abstract loadAsset(src: unknown): Promise<unknown>;
}
