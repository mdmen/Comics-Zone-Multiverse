export class Container {
  public children: this[] = [];
  public parent: this | null = null;

  public addChild(item: this) {
    if (item.parent) {
      item.parent.removeChild(this);
    }

    item.parent = this;
    this.children.push(item);

    return this;
  }

  public removeChild(item: this) {
    item.parent = null;

    const index = this.children.indexOf(item);
    if (index !== -1) {
      this.children.splice(index, 1);
    }

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

  public destroy() {
    this.children.forEach((item) => {
      item.destroy();
    });

    this.children = [];
    this.parent = null;
  }
}
