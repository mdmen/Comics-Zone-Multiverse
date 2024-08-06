import { type Drawable } from '@/core';
import { Progress } from './Progress';

interface Options {
  bar: Drawable;
  total: number;
  delay?: number;
}

export class ProgressBar extends Progress {
  private bar;
  private totalWidth;

  constructor({ total, delay, bar }: Options) {
    super(total, delay);

    this.bar = bar;
    this.totalWidth = bar.getWidth();

    this.reset();
  }

  protected async updateVisually() {
    const barWidth = (this.progressPercent / 100) * this.totalWidth;
    this.bar.setWidth(barWidth);
  }

  setTotalWidth(width: number) {
    this.totalWidth = width;
  }

  getBar() {
    return this.bar;
  }

  reset() {
    super.reset();

    this.bar.setWidth(0);
  }
}
