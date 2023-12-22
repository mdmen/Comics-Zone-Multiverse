import { type Scene, type TextOptions } from '@/engine';
import { Progress } from './Progress';
import { BaseText } from '../../BaseText';

interface Options extends Omit<TextOptions, 'text'> {
  total: number;
  scene: Scene;
  template: (progress: number) => string;
  delay?: number;
}

export class ProgressText extends Progress {
  private readonly scene;
  private readonly text;
  private readonly template;

  constructor({ scene, total, template, delay, ...options }: Options) {
    super(total, delay);

    this.scene = scene;
    this.template = template;

    this.text = new BaseText({
      ...options,
      text: template(0),
    });

    this.scene.add(this.text);
  }

  protected async updateVisually() {
    const text = this.template(this.currentPercentAsync);
    await this.text.setText(text);
  }

  hide() {
    this.text.hide();
  }
}
