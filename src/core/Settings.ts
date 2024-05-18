import { RenderEngines } from './RenderEngines';

const settings = {
  gamepad: false,
  storagesPrefix: 'game',
  eventsPrefix: 'GAME',
  renderEngine: RenderEngines.CANVAS,
  fps: 60,
  canvasWidth: 1024,
  canvasHeight: 768,
  antialiasing: true,
  cameraOffsetX: 50,
  cameraOffsetY: 50,
};

type SettingsMap = typeof settings;
type SettingsMapKeys = keyof SettingsMap;

interface Settings {
  get<T extends SettingsMapKeys>(key: T): SettingsMap[T];
  set<T extends SettingsMapKeys>(key: T, value: SettingsMap[T]): void;
  isHTMLRenderEngine(): boolean;
}

export const Settings: Readonly<Settings> = {
  get(key) {
    return settings[key];
  },

  set(key, value) {
    settings[key] = value;
  },

  isHTMLRenderEngine() {
    return settings.renderEngine === RenderEngines.HTML;
  },
};
