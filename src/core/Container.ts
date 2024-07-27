export class Container {
  protected readonly children = new Set<this>();
  protected parent: this | null = null;

  public addChild(item: this) {
    item.parent = this;
    this.children.add(item);

    return this;
  }

  public removeChild(item: this) {
    item.parent = null;
    this.children.delete(item);

    return this;
  }

  public addChildren(...items: this[]) {
    items.forEach((item) => {
      this.addChild(item);
    });

    return this;
  }

  public removeChildren(...items: this[]) {
    items.forEach((item) => {
      this.removeChild(item);
    });

    return this;
  }

  public traverseParents(callback: (item: this) => void) {
    let parent = this.parent;

    while (parent) {
      callback(parent);

      parent = parent.parent;
    }
  }

  public traverseChildren(callback: (item: this) => void) {
    this.children.forEach((item) => {
      callback(item);

      item.traverseChildren(callback);
    });
  }

  public findParent(predicate: (item: this) => boolean) {
    let parent = this.parent;

    while (parent) {
      if (predicate(parent)) return parent;

      parent = parent.parent;
    }

    return null;
  }

  public traverseParentsUntil(predicate: (item: this) => boolean) {
    this.findParent(predicate);
  }

  public destroy() {
    this.children.forEach((item) => {
      item.destroy();
    });

    this.children.clear();
    this.parent = null;
  }
}
