import { Logger } from './Logger';
import type { Progress, Emitter } from '.';

export const AssetsEvents = {
  LOADING_PROGRESS: 'assets.loading_progress',
} as const;

type Resources<Type> = Record<string, Type>;

export abstract class Assets<
  Asset extends HTMLAudioElement | HTMLImageElement
> {
  protected readonly sources;
  private readonly progress;
  private readonly emitter;
  private assets: Resources<Asset> = {};

  constructor(
    sources: Record<string, string>,
    progress: Progress,
    emitter: Emitter
  ) {
    this.sources = sources;
    this.progress = progress;
    this.emitter = emitter;

    const totalCount = this.getTotalCount();
    this.progress.setTotal(totalCount);
  }

  private getTotalCount() {
    return Object.keys(this.sources).length;
  }

  public async load(): Promise<Asset[]> {
    try {
      const names = Object.keys(this.sources);

      return await Promise.all(
        names.map(async (key) => {
          const asset = await this.loadResource(this.sources[key]);

          this.assets[key] = asset;
          this.handleProgress();

          return asset;
        })
      );
    } catch (error) {
      Logger.error(error);
      return [];
    }
  }

  private handleProgress(): void {
    this.progress.increment();

    if (this.progress.hasProgress()) {
      this.emitter.emit(AssetsEvents.LOADING_PROGRESS, this.progress.get());
    }
  }

  public getAll(): Resources<Asset> {
    return this.assets;
  }

  protected abstract loadResource(src: string): Promise<Asset>;
}
