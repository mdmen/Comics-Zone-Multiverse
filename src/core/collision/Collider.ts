import type { Entity } from '../entities';
import { Size } from '../geometry';

export abstract class Collider<T extends Entity = Entity> {
  public readonly size = new Size();

  constructor(
    public readonly entity: T,
    public readonly groups: number[] = []
  ) {}

  abstract collidesWith(other: Collider<Entity>): boolean;
}
