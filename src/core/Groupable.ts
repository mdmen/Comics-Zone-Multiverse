export class Groupable {
  protected readonly children = new Set<this>();
  protected parent: this | null = null;

  public addChild(groupable: this) {
    groupable.parent = this;
    this.children.add(groupable);

    return this;
  }

  public removeChild(groupable: this) {
    groupable.parent = null;
    this.children.delete(groupable);

    return this;
  }

  public addChildren(...groupables: this[]) {
    groupables.forEach((groupable) => {
      this.addChild(groupable);
    });

    return this;
  }

  public removeChildren(...groupables: this[]) {
    groupables.forEach((groupable) => {
      this.removeChild(groupable);
    });

    return this;
  }

  public traverseParents(callback: (groupable: this) => void) {
    let parent = this.parent;

    while (parent) {
      callback(parent);

      parent = parent.parent;
    }
  }

  public traverseChildren(callback: (groupable: this) => void) {
    this.children.forEach((groupable) => {
      callback(groupable);

      groupable.traverseChildren(callback);
    });
  }

  public findParent(predicate: (groupable: this) => boolean) {
    let parent = this.parent;

    while (parent) {
      if (predicate(parent)) return parent;

      parent = parent.parent;
    }

    return null;
  }

  public destroy() {
    this.children.forEach((groupable) => {
      groupable.destroy();
    });
    this.children.clear();
    this.parent = null;
  }
}
