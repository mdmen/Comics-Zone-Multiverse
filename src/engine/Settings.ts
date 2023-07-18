type RenderEngine = 'canvas' | 'dom';
type SettingsMap = typeof settings;
type SettingsMapKeys = keyof SettingsMap;

const settings = {
  gamepadAllowed: false,
  storagePrefix: 'comics-zone-',
  eventsPrefix: 'COMICS_ZONE_',

  renderEngine: 'canvas' as RenderEngine,
  fps: 60,
  canvasWidth: 1024,
  canvasHeight: 768,
  canvasClassName: 'layer',
  // only DOM render
  canvasSubLayerClassName: 'sub-layer',
  antialiasing: false,
  animationFrameDuration: 200,

  cameraOffsetX: 50,
  cameraOffsetY: 50,

  spriteFontScale: 2,
  spriteFontRowGap: 3,
  spriteFontCenter: true,
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
