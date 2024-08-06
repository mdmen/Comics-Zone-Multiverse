import { type Text } from '@/core';
import { Progress } from './Progress';

interface Options {
  total: number;
  text: Text;
  template: (progress: number) => string;
  delay?: number;
}

export class ProgressText extends Progress {
  private text;
  private template;

  constructor({ total, template, delay, text }: Options) {
    super(total, delay);

    this.template = template;
    this.text = text;

    this.reset();
  }

  protected async updateVisually() {
    const text = this.template(this.progressPercent);
    await this.text.setText(text);
  }

  reset() {
    super.reset();

    this.text.setText(this.template(0));
  }
}
