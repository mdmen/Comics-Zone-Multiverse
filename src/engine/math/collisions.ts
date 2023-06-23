import type { Vector } from './Vector';
import type { Rectangle } from '../math/Rectangle';

export function isPointWithinRectangle(p: Vector, r: Rectangle): boolean {
  const rPosition = r.getPosition();

  return !(
    p.x < rPosition.x ||
    p.x > rPosition.x + r.getWidth() ||
    p.y < rPosition.y ||
    p.y > rPosition.y + r.getHeight()
  );
}

export function isRectanglesCollide(r1: Rectangle, r2: Rectangle): boolean {
  const r1Position = r1.getPosition();
  const r2Position = r2.getPosition();

  return !(
    r1Position.x > r2.getWidth() + r2Position.x ||
    r1Position.x + r1.getWidth() < r2Position.x ||
    r1Position.y > r2.getHeight() + r2Position.y ||
    r1Position.y + r1.getHeight() < r2Position.y
  );
}
