import { Vector, type Scene, Text, delay, isEmpty } from '@/engine';
import { Progress } from './Progress';

interface Options {
  total: number;
  scene: Scene;
  centered?: boolean;
  position?: Vector;
  scale?: number;
  stepDelay?: number;
  templateFunc?: (progress: number) => string;
}

function getProgressText(progress: number): string {
  return `Progress...${progress}%`;
}

export class ProgressText extends Progress {
  private readonly scene;
  private readonly text;
  private readonly stepDelay;
  private currentPercentAsync = 0;
  private busy = false;
  private readonly textTemplateFunc;

  constructor({
    scene,
    total,
    centered = false,
    position = new Vector(),
    scale = 1,
    stepDelay = 0,
    templateFunc = getProgressText,
  }: Options) {
    super(total, !!stepDelay);

    this.scene = scene;
    this.stepDelay = stepDelay;
    this.textTemplateFunc = templateFunc;

    this.text = new Text({
      x: position.x,
      y: position.y,
      scale,
      text: templateFunc(0),
      onCreate: (text) => {
        centered && text.centerHorizontally();
      },
    });

    this.scene.add(this.text);
  }

  protected updateSync() {
    const percent = Math.floor(this.progressPercent);
    this.text.setText(this.textTemplateFunc(percent));

    this.notify(this.progressPercent);
  }

  protected async updateAsync(): Promise<void> {
    if (isEmpty(this.stack) || this.busy) {
      return;
    }

    if (this.busy) return;

    this.busy = true;

    const targetPercent = this.stack.shift() as number;

    while (this.currentPercentAsync < targetPercent) {
      await delay(this.stepDelay);
      this.currentPercentAsync++;

      const text = this.textTemplateFunc(this.currentPercentAsync);
      await this.text.setText(text);
    }

    this.busy = false;

    this.notify(this.currentPercentAsync);

    this.updateAsync();
  }

  hide() {
    this.text.hide();
  }
}
