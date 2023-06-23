type RenderEngine = 'canvas' | 'dom';
type SettingsMap = typeof settings;
type SettingsMapKeys = keyof SettingsMap;

const settings = {
  gamepadAllowed: false,
  storagePrefix: 'glitch_game_',

  renderEngine: 'canvas' as RenderEngine,
  fps: 60,
  canvasWidth: 1024,
  canvasHeight: 768,
  canvasClassName: 'layer',
  canvasSubLayerClassName: 'sub-layer', // only DOM render
  antialiasing: false,

  cameraOffsetX: 50,
  cameraOffsetY: 50,
};

interface Settings {
  get<T extends SettingsMapKeys>(key: T): SettingsMap[T];
  set<T extends SettingsMapKeys>(key: T, value: SettingsMap[T]): void;
}

export const Settings: Readonly<Settings> = {
  get(key) {
    return settings[key];
  },

  set(key, value) {
    settings[key] = value;
  },
};
