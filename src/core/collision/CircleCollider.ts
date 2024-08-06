import type { CircleEntity } from '../entities';
import { Collider } from './Collider';
import type { RectCollider } from './RectCollider';
import {
  isRectCollidingWithRect,
  isCircleCollidingWithCircle,
} from './collisions';
import { Shape } from '../geometry';

export class CircleCollider extends Collider<CircleEntity> {
  public collidesWith(object: RectCollider | CircleCollider) {
    if (!isRectCollidingWithRect(this.entity, object.entity)) return false;

    if (object.entity.shape === Shape.Circle) {
      return isCircleCollidingWithCircle(
        this.entity,
        (object as CircleCollider).entity
      );
    }

    return false;
  }
}
