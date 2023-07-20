import { getPercent } from '@/engine';

export class Progress {
  protected readonly total;
  protected progress = 0;
  protected progressPercent = 0;
  protected prevPercent = 0;

  constructor(total: number) {
    this.total = total;
  }

  public update(): void {
    this.progress++;

    this.progressPercent = getPercent(this.total, this.progress);

    if (this.progressPercent === this.prevPercent) return;

    this.prevPercent = this.progressPercent;
  }

  public reset(): void {
    this.progress = 0;
    this.progressPercent = 0;
    this.prevPercent = 0;
  }
}
