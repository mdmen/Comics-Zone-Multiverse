interface Options {
  value?: number;
  min?: number;
  max?: number;
  velocity?: number;
}

export class Pendulum {
  private value;
  private min;
  private max;
  private velocity;
  private factor: -1 | 1 = 1;

  constructor({ value = 0, min = 0, max = 1, velocity = 1 }: Options) {
    this.value = value;
    this.min = min;
    this.max = max;
    this.velocity = velocity;

    if (value < min || value > max) {
      throw Error(
        `Value of pendulum must be between ${this.min} and ${this.max}`
      );
    }
  }

  public update(step: number): void {
    this.value += this.factor * step * this.velocity;

    if (this.value <= this.min) {
      this.factor = 1;
      this.value = this.min;
    }

    if (this.value >= this.max) {
      this.factor = -1;
      this.value = this.max;
    }
  }

  public getValue(): number {
    return +this.value.toFixed(2);
  }
}
