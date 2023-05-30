import type { SpriteSound } from './SpriteSound';
import type { Sound } from './Sound';
import { Logger } from '../common/Logger';

export class Sounds<Resources extends Record<string, Sound | SpriteSound>> {
  private readonly resources;

  constructor(resources: Resources) {
    this.resources = resources;
  }

  public play<Key extends keyof Resources>(
    ...args: Resources[Key] extends SpriteSound
      ? [
          Key,
          Resources[Key] extends SpriteSound<infer Segments> ? Segments : never
        ]
      : [Key]
  ): void {
    try {
      const [name, segment] = args;
      const resource = this.resources[name];
      resource.play(segment as string);
    } catch (error) {
      Logger.error(error);
    }
  }

  public stop(name: keyof Resources): void {
    try {
      this.resources[name].stop();
    } catch (error) {
      Logger.error(error);
    }
  }
}
