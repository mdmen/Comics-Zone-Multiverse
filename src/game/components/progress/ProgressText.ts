import { Vector, type Scene, SpriteText } from '@/engine';
import { Progress } from './Progress';

interface Options {
  total: number;
  scene: Scene;
  centered?: boolean;
  position?: Vector;
  scale?: number;
  templateFunc?: (progress: number) => string;
}

function getProgressText(progress: number): string {
  return `Loading...${progress}%`;
}

export class ProgressText extends Progress {
  private readonly scene;
  private readonly text;
  private readonly textTemplateFunc;
  private readonly centered;

  constructor({
    scene,
    total,
    centered = false,
    position = new Vector(),
    templateFunc = getProgressText,
    scale = 1,
  }: Options) {
    super(total);

    this.scene = scene;
    this.centered = centered;
    this.textTemplateFunc = templateFunc;

    this.text = new SpriteText({
      x: position.x,
      y: position.y,
      scale,
      text: templateFunc(0),
      onCreate: (text) => {
        text.centerHorizontally();
      },
    });

    this.scene.add(this.text);
  }

  public async update(): Promise<void> {
    super.update();

    if (this.text && this.textTemplateFunc) {
      const percent = Math.floor(this.progressPercent);
      await this.text.setText(this.textTemplateFunc(percent));
    }
  }
}
