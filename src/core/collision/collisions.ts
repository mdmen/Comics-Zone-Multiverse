import type { Rectangle, Point, Circle } from '../geometry';

export function isRectCollidingWithRect(r1: Rectangle, r2: Rectangle) {
  return (
    r1.position.x < r2.position.x + r2.size.width &&
    r1.position.x + r1.size.width > r2.position.x &&
    r1.position.y < r2.position.y + r2.size.height &&
    r1.position.y + r1.size.height > r2.position.y
  );
}

export function isRectCollidingWithPoint(rect: Rectangle, point: Point) {
  return (
    point.x >= rect.position.x &&
    point.x <= rect.position.x + rect.size.width &&
    point.y >= rect.position.y &&
    point.y <= rect.position.y + rect.size.height
  );
}

export function isRectCollidingWithCircle(rect: Rectangle, circle: Circle) {
  const halfBoxWidth = rect.size.width / 2;
  const halfBoxHeight = rect.size.height / 2;
  const distX = Math.abs(
    circle.position.x - (rect.position.x + rect.size.width / 2)
  );
  const distY = Math.abs(
    circle.position.y - (rect.position.y + rect.size.height / 2)
  );

  if (
    distX > halfBoxWidth + circle.radius ||
    distY > halfBoxHeight + circle.radius
  ) {
    return false;
  }

  if (distX <= halfBoxWidth || distY <= halfBoxHeight) {
    return true;
  }

  const x = distX - halfBoxHeight;
  const y = distY - halfBoxHeight;

  return x * x + y * y <= circle.radius * circle.radius;
}

export function isCircleCollidingWithPoint(circle: Circle, point: Point) {
  const x = point.x - circle.position.x;
  const y = point.y - circle.position.y;

  return x * x + y * y <= circle.radius * circle.radius;
}

export function isCircleCollidingWithCircle(c1: Circle, c2: Circle) {
  const x = c1.position.x - c2.position.x;
  const y = c1.position.y - c2.position.y;
  const rSum = c1.radius + c2.radius;

  return x * x + y * y <= rSum * rSum;
}
