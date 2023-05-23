// TODO rewrite through generators
export class Progress {
  private total = 0;
  private counter = 0;
  private currentPercent = 0;
  private prevPercent = 0;
  public increment = this.fakeIncrement;

  public setTotal(total: number): void {
    this.total = total;
    this.increment = this.actualIncrement;
  }

  private fakeIncrement(): void {
    throw Error('You forgot to set total for progress');
  }

  private actualIncrement(): void {
    this.counter++;
    this.prevPercent = this.currentPercent;
    this.currentPercent = ((this.counter / this.total) * 100) | 0;
  }

  public hasProgress(): boolean {
    return this.currentPercent > this.prevPercent;
  }

  public get(): number {
    return this.currentPercent;
  }

  public reset(): void {
    this.increment = this.fakeIncrement;
    this.total = 0;
    this.counter = 0;
    this.currentPercent = 0;
    this.prevPercent = 0;
  }
}
