import { LinkedList, Observable, getPercent } from '@/engine';

export abstract class Progress extends Observable {
  protected readonly total;
  private readonly delay;
  protected progress = 0;
  protected progressPercent = 0;
  protected prevPercent = 0;
  protected readonly stack = new LinkedList<number>();

  constructor(total: number, delay = false) {
    super();

    this.total = total;
    this.delay = delay;
  }

  protected shouldUpdate(): boolean {
    return this.progressPercent !== this.prevPercent;
  }

  public update(): void {
    this.progress++;

    this.progressPercent = getPercent(this.total, this.progress);

    if (this.progressPercent === this.prevPercent) return;

    if (this.delay) {
      this.stack.append(this.progressPercent);
      this.updateAsync();
    } else {
      this.updateSync();
    }

    this.prevPercent = this.progressPercent;
  }

  protected abstract updateSync(): void;

  protected abstract updateAsync(): void;

  public reset(): void {
    this.progress = 0;
    this.progressPercent = 0;
    this.prevPercent = 0;
    this.stack.clear();
  }
}
