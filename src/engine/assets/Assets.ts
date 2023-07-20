import { Logger } from '../Logger';
import { Observable } from '../Observable';
import { isEmpty } from '../utils';

type Sources = Record<string, unknown>;
type Resources = Sources;

export abstract class Assets extends Observable {
  public async load(sources: Sources): Promise<Resources> {
    const assets = {} as Resources;
    let loadCounter = 0;

    try {
      const names = Object.keys(sources);

      if (isEmpty(names)) {
        throw Error('There is nothing to load');
      }

      await Promise.all(
        names.map(async (key) => {
          const source = sources[key];
          const asset = await this.loadAsset(source);

          loadCounter++;

          this.notify(loadCounter);

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
