import { RenderEngines } from './RenderEngines';

const settings = {
  debug: false,
  antialiasing: false,
  renderEngine: RenderEngines.CANVAS,
};

type SettingsMap = typeof settings;
type SettingsMapKeys = keyof SettingsMap;

interface Settings {
  get<T extends SettingsMapKeys>(key: T): SettingsMap[T];
  set<T extends SettingsMapKeys>(key: T, value: SettingsMap[T]): void;
  isHTMLRenderEngine(): boolean;
  isDebug(): boolean;
  isAntialiasing(): boolean;
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

  isDebug() {
    return settings.debug;
  },

  isAntialiasing() {
    return settings.antialiasing;
  },
};
