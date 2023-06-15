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
  antialiasing: false,
  canvasScale: 1,
  canvasClassName: 'layer',

  cameraXOffset: 50,
  cameraYOffset: 50,
};

interface Settings {
  getValue<T extends SettingsMapKeys>(key: T): SettingsMap[T];
  setValue<T extends SettingsMapKeys>(key: T, value: SettingsMap[T]): void;
}

export const Settings: Readonly<Settings> = {
  getValue(key) {
    return settings[key];
  },

  setValue(key, value) {
    settings[key] = value;
  },
};
