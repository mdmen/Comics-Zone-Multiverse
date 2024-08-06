import { isEmpty } from './utils';
import { Rectangle } from './geometry';

export class QuadTree {
  private readonly maxObjects = 10;
  private readonly maxLevels = 5;
  private readonly level;
  private readonly bounds;
  private readonly objects: Set<Rectangle>;
  private readonly nodes: QuadTree[];

  constructor(bounds: Rectangle, level = 0) {
    this.level = level;
    this.bounds = bounds;
    this.objects = new Set();
    this.nodes = [];
  }

  private split() {
    const position = this.bounds.getPosition();
    const level = this.level + 1;
    const halfWidth = this.bounds.getWidth() / 2;
    const halfHeight = this.bounds.getHeight() / 2;

    this.nodes[0] = new QuadTree(
      new Rect(position.x, position.y, halfWidth, halfHeight),
      level
    );

    this.nodes[1] = new QuadTree(
      new Rect(position.x + halfWidth, position.y, halfWidth, halfHeight),
      level
    );

    this.nodes[2] = new QuadTree(
      new Rect(
        position.x + halfWidth,
        position.y + halfHeight,
        halfWidth,
        halfHeight
      ),
      level
    );

    this.nodes[3] = new QuadTree(
      new Rect(position.x, position.y + halfHeight, halfWidth, halfHeight),
      level
    );
  }

  private getIndex(object: Rectangle) {
    const indexes = [];
    const position = this.bounds.getPosition();
    const verticalMidpoint = position.x + this.bounds.getWidth() / 2;
    const horizontalMidpoint = position.y + this.bounds.getHeight() / 2;

    const top = position.y < horizontalMidpoint;
    const left = position.x < verticalMidpoint;
    const right = position.x + object.getWidth() > verticalMidpoint;
    const bottom = position.y + object.getHeight() > horizontalMidpoint;

    if (top && top) indexes.push(0);
    if (top && right) indexes.push(1);
    if (bottom && right) indexes.push(2);
    if (bottom && left) indexes.push(3);

    return indexes;
  }

  private isSizeExceeded() {
    return this.objects.size > this.maxObjects && this.level < this.maxLevels;
  }

  insert(object: Rectangle) {
    if (!isEmpty(this.nodes)) {
      const indexes = this.getIndex(object);

      for (let i = 0; i < indexes.length; i++) {
        this.nodes[indexes[i]].insert(object);
      }

      return;
    }

    this.objects.add(object);

    if (!this.isSizeExceeded()) return;
    if (isEmpty(this.nodes)) this.split();

    this.objects.forEach((object) => {
      const indexes = this.getIndex(object);

      for (let j = 0; j < indexes.length; j++) {
        this.nodes[indexes[j]].insert(object);
      }
    });

    this.objects.clear();
  }

  retrieve(object: Rectangle) {
    const indexes = this.getIndex(object);

    if (!isEmpty(this.nodes)) {
      for (let i = 0; i < indexes.length; i++) {
        const objects = this.nodes[indexes[i]].retrieve(object);
        objects.forEach(this.objects.add, this.objects);
      }
    }

    return this.objects;
  }

  clear() {
    this.objects.clear();

    for (let i = 0; i < this.nodes.length; i++) {
      this.nodes[i].clear();
    }

    this.nodes.length = 0;
  }
}
