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
    const parent = this.parent;

    if (parent) {
      callback(parent);

      parent.traverseParents(callback);
    }
  }

  public destroy() {
    this.children.forEach((groupable) => {
      groupable.destroy();
    });
    this.children.clear();
    this.parent = null;
  }
}
