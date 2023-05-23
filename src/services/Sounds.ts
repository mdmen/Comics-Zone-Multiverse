import type { AudioSprite } from '../entities/AudioSprite';
import type { Audio } from '../platform/Audio';
import { isAudio } from '../helpers';

type Resource<T extends string> = Record<T, AudioBuffer | AudioSprite<string>>;

export class Sounds<Names extends string> {
  private readonly resources;
  private readonly context;

  constructor(context: Audio, resources: Resource<Names>) {
    this.context = context;
    this.resources = resources;
  }

  public play(name: Names, loop?: boolean): void {
    const resource = this.resources[name];

    if (isAudio(resource)) {
      this.context.play({
        buffer: resource,
        loop,
      });
    } else {
      throw Error(`Resource with name ${name} is a sprite`);
    }
  }

  public getSprite<Segments extends string>(
    name: Names
  ): AudioSprite<Segments> {
    const resource = this.resources[name];

    if (isAudio(resource)) {
      throw Error(`Resource with name ${name} is not a sprite`);
    }

    return resource;
  }

  public stop(name: Names): void {
    const resource = this.resources[name];

    if (isAudio(resource)) {
      this.context.stop(resource);
    } else {
      resource.stop();
    }
  }
}
