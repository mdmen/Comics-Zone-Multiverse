import type { SpriteSound } from './SpriteSound';
import type { Sound } from './Sound';
import { Logger } from '../common/Logger';

type Resource<Names extends string, Segments extends string> = Record<
  Names,
  Sound | SpriteSound<Segments>
>;

export class Sounds<Names extends string, Segments extends string> {
  private readonly resources;

  constructor(resources: Resource<Names, Segments>) {
    this.resources = resources;
  }

  public play(name: Names, segment?: Segments): void {
    try {
      const resource = this.resources[name];
      resource.play(segment as Segments);
    } catch (error) {
      Logger.error(error);
    }
  }

  public stop(name: Names): void {
    try {
      this.resources[name].stop();
    } catch (error) {
      Logger.error(error);
    }
  }
}
