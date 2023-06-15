// TODO rewrite through generators
export class Progress {
  private total;
  private counter = 0;
  private currentPercent = 0;
  private prevPercent = 0;

  constructor(total = 100) {
    this.total = total;
  }

  public setTotal(total: number): void {
    this.reset();
    this.total = total;
  }

  public increment(): void {
    this.counter++;
    this.prevPercent = this.currentPercent;
    this.currentPercent = Math.floor((this.counter / this.total) * 100);
  }

  public hasProgress(): boolean {
    return this.currentPercent > this.prevPercent;
  }

  public get(): number {
    return this.currentPercent;
  }

  public reset(): void {
    this.total = 0;
    this.counter = 0;
    this.currentPercent = 0;
    this.prevPercent = 0;
  }
}
