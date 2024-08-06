import type { RectEntity } from '../entities';
import { Collider } from './Collider';
import type { CircleCollider } from './CircleCollider';
import {
  isRectCollidingWithCircle,
  isRectCollidingWithRect,
} from './collisions';
import { Shape } from '../geometry/Shape';

export class RectCollider extends Collider<RectEntity> {
  public collidesWith(object: RectCollider | CircleCollider) {
    if (!isRectCollidingWithRect(this.entity, object.entity)) return false;

    if (object.entity.shape === Shape.Circle) {
      return isRectCollidingWithCircle(
        this.entity,
        (object as CircleCollider).entity
      );
    }

    return false;
  }
}
