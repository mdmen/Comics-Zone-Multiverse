import { RenderEngine } from './RenderEngine';

interface SettingsValues {
  debug: boolean;
  antialiasing: boolean;
  renderEngine: RenderEngine;
}

export class Settings {
  private static instance: Settings;
  private readonly settings: SettingsValues = {
    debug: false,
    antialiasing: true,
    renderEngine: RenderEngine.WebGL,
  };

  public static getInstance() {
    if (!Settings.instance) {
      Settings.instance = new Settings();
    }

    return Settings.instance;
  }

  public get<T extends keyof SettingsValues>(key: T): SettingsValues[T] {
    return this.settings[key];
  }

  public set<T extends keyof SettingsValues>(key: T, value: SettingsValues[T]) {
    this.settings[key] = value;
  }

  public isHTMLRenderEngine() {
    return this.settings.renderEngine === RenderEngine.HTML;
  }

  public isWebGLRenderEngine() {
    return this.settings.renderEngine === RenderEngine.WebGL;
  }

  public isCanvasRenderEngine() {
    return this.settings.renderEngine === RenderEngine.Canvas;
  }

  public isWebGPURenderEngine() {
    return this.settings.renderEngine === RenderEngine.WebGPU;
  }

  public isDebug() {
    return this.settings.debug;
  }

  public isAntialiasing() {
    return this.settings.antialiasing;
  }
}
