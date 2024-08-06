import type { Entity } from './entities';
import { Vector } from './geometry';

export class Physics {
  public static readonly gravity = new Vector();
  public readonly velocity = new Vector();
  public readonly acceleration = new Vector();
  public readonly friction = new Vector();
  public readonly speedLimit = new Vector(Infinity, Infinity);
  public mass = 0;
  public inverseMass = 0;
  public angularVelocity = 0;
  public angularAcceleration = 0;
  public inertia = 0;

  constructor(public readonly entity: Entity) {}

  public update(deltaStep: number) {
    this.velocity.addV(Physics.gravity);
    this.velocity.scaleV(this.friction);

    if (this.velocity.x > this.speedLimit.x) {
      this.velocity.x = this.speedLimit.x;
    }
    if (this.velocity.y > this.speedLimit.y) {
      this.velocity.y = this.speedLimit.y;
    }

    if (!this.velocity.isZero()) {
      const step = this.velocity.clone();

      step.scale(deltaStep);
      this.entity.transform.position.addV(step);
    }
  }
}
