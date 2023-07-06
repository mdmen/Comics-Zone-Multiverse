export interface GroupUpdatable {
  update(step: number): void;
  draw(): void;
  destroy(): void;
}

export class Group<Item extends GroupUpdatable = GroupUpdatable> {
  protected updatables: Set<Item> = new Set();

  public add(updatable: Item): void {
    this.updatables.add(updatable);
  }

  public remove(updatable: Item): void {
    this.updatables.delete(updatable);
  }

  public update(step: number): void {
    this.updatables.forEach((updatable) => {
      updatable.update(step);
    });
  }

  public destroy(): void {
    this.updatables.forEach((updatable) => {
      updatable.destroy();
    });
  }

  public draw(): void {
    this.updatables.forEach((updatable) => {
      updatable.draw();
    });
  }

  public clear(): void {
    this.destroy();
    this.updatables.clear();
  }
}
