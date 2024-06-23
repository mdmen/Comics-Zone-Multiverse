import { RenderEngines } from './RenderEngines';

interface Values {
  debug: boolean;
  antialiasing: boolean;
  renderEngine: RenderEngines;
}

export class Settings {
  private static instance: Settings;
  private readonly values: Values = {
    debug: false,
    antialiasing: false,
    renderEngine: RenderEngines.CANVAS,
  };

  public static getInstance() {
    if (!Settings.instance) {
      Settings.instance = new Settings();
    }

    return Settings.instance;
  }

  public get<T extends keyof Values>(key: T): Values[T] {
    return this.values[key];
  }

  public set<T extends keyof Values>(key: T, value: Values[T]) {
    this.values[key] = value;
  }

  public isHTMLRenderEngine() {
    return this.values.renderEngine === RenderEngines.HTML;
  }

  public isWebGLRenderEngine() {
    return this.values.renderEngine === RenderEngines.WEBGL;
  }

  public isCanvasRenderEngine() {
    return this.values.renderEngine === RenderEngines.CANVAS;
  }

  public isDebug() {
    return this.values.debug;
  }

  public isAntialiasing() {
    return this.values.antialiasing;
  }
}
