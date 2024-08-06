import { Observable } from '@/core';
import { getPercent, wait } from '../../helpers';

export abstract class Progress extends Observable<Progress> {
  protected total;
  protected queuedPercentUpdates = 0;
  protected progress = 0;
  protected progressPercent = 0;
  protected busy = false;
  protected delay;

  constructor(total: number, delay = 0) {
    super();

    this.total = total;
    this.delay = delay;
  }

  protected abstract updateVisually(): Promise<void>;

  listen(progressValue = 1) {
    if (this.progress === this.total) return;

    this.progress += progressValue;
    if (this.progress > this.total) {
      this.progress = this.total;
    }

    this.queuedPercentUpdates += getPercent(this.total, progressValue);
    this.updateAsync();
  }

  private shouldUpdateAsync() {
    return !this.busy && this.queuedPercentUpdates;
  }

  private async updateAsync() {
    if (!this.shouldUpdateAsync()) {
      return;
    }

    this.busy = true;

    while (this.queuedPercentUpdates) {
      await wait(this.delay);

      this.progressPercent++;
      this.queuedPercentUpdates--;

      await this.updateVisually();
    }

    this.busy = false;

    this.notify(this);

    this.updateAsync();
  }

  getProgressPercent() {
    return this.progressPercent;
  }

  reset() {
    this.progress = 0;
    this.progressPercent = 0;
    this.queuedPercentUpdates = 0;
  }
}
