type RenderEngine = 'canvas' | 'dom' | 'webgl';

const settings = {
  gamepad: false,
  storagePrefix: 'game-',
  eventsPrefix: 'GAME_',
  render: 'canvas' as RenderEngine,
  fps: 60,
  width: 1024,
  height: 768,
  antialiasing: true,
  cameraOffsetX: 50,
  cameraOffsetY: 50,
};

type SettingsMap = typeof settings;
type SettingsMapKeys = keyof SettingsMap;

interface Settings {
  get<T extends SettingsMapKeys>(key: T): SettingsMap[T];
  set<T extends SettingsMapKeys>(key: T, value: SettingsMap[T]): void;
  isDOMEngine(): boolean;
}

export const Settings: Readonly<Settings> = {
  get(key) {
    return settings[key];
  },

  set(key, value) {
    settings[key] = value;
  },

  isDOMEngine() {
    return settings.render === 'dom';
  },
};
