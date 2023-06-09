interface Point {
  x: number;
  y: number;
}

interface Rectangle extends Point {
  width: number;
  height: number;
}

export function isPointRectangleIntersect(p: Point, r: Rectangle): boolean {
  return !(
    p.x < r.x ||
    p.x > r.x + r.width ||
    p.y < r.y ||
    p.y > r.y + r.height
  );
}

export function isRectanglesIntersect(r1: Rectangle, r2: Rectangle): boolean {
  return !(
    r1.x > r2.width + r2.x ||
    r1.x + r1.width < r2.x ||
    r1.y > r2.height + r2.y ||
    r1.y + r1.height < r2.y
  );
}
