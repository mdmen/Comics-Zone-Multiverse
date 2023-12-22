import { LinkedList, Observable, delay, isEmpty } from '@/engine';
import { getPercent } from '../../helpers';

export abstract class Progress extends Observable {
  protected readonly total;
  protected readonly stack = new LinkedList<number>();
  protected progress = 0;
  protected progressPercent = 0;
  protected prevPercent = 0;
  protected currentPercentAsync = 0;
  protected busy = false;
  protected delay;

  constructor(total: number, delay = 0) {
    super();

    this.total = total;
    this.delay = delay;
  }

  protected abstract updateVisually(): Promise<void>;

  update() {
    this.progress++;
    this.progressPercent = getPercent(this.total, this.progress);

    if (this.progressPercent === this.prevPercent) return;

    this.stack.append(this.progressPercent);
    this.updateAsync();

    this.prevPercent = this.progressPercent;
  }

  protected async updateAsync() {
    if (this.busy || isEmpty(this.stack) || this.currentPercentAsync === 100) {
      return;
    }

    this.busy = true;

    const targetPercent = this.stack.shift() as number;

    while (this.currentPercentAsync < targetPercent) {
      await delay(this.delay);
      this.currentPercentAsync++;

      await this.updateVisually();
    }

    this.busy = false;

    this.notify(this.currentPercentAsync);

    this.updateAsync();
  }

  reset() {
    this.progress = 0;
    this.progressPercent = 0;
    this.prevPercent = 0;
    this.currentPercentAsync = 0;
    this.stack.clear();
  }
}
