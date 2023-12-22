import { type Config } from '../Config';
import { isSystemDarkTheme } from '../helpers';
import { Node, Checkbox, type NodeContent, RadioGroup } from './components';

export class Options extends Node {
  private config;

  constructor(config: Config) {
    super();

    this.config = config;

    this.node = this.create();
  }

  protected create() {
    const node = document.createElement('div');
    node.classList.add('options');

    node.append(
      this.createField('options-item', [
        this.createSoundToggler(),
        this.createThemeToggler(),
        this.createVirtualKeyboardToggler(),
      ])
    );

    node.append(
      this.createField('options-item', [
        this.createField('options-item-engine', this.createEngineTogglers()),
        this.createControlsInfo(),
      ])
    );

    return node;
  }

  private createField(className: string, node: NodeContent) {
    const field = document.createElement('div');
    field.classList.add(className);

    Node.addContent(field, node);

    return field;
  }

  private createSoundToggler() {
    const soundState = this.config.getSound();
    const enabled = soundState === 'on';

    return new Checkbox({
      checked: enabled,
      label: 'Sound',
      onChange: (checkbox: Checkbox) => {
        const sound = checkbox.isChecked() ? 'on' : 'off';
        this.config.setSound(sound);
      },
    });
  }

  private createThemeToggler() {
    const currentTheme = this.config.getTheme();
    const dark =
      (currentTheme === 'system' && isSystemDarkTheme()) ||
      currentTheme === 'dark';

    return new Checkbox({
      checked: dark,
      label: 'Dark theme',
      onChange: (checkbox: Checkbox) => {
        const theme = checkbox.isChecked() ? 'dark' : 'light';
        this.config.setTheme(theme);
      },
    });
  }

  private createVirtualKeyboardToggler() {
    return new Checkbox({
      disabled: true,
      label: 'Virtual keyboard',
      onChange: () => {},
    });
  }

  private createEngineTogglers() {
    const items = [
      {
        value: 'canvas',
        label: '2D canvas',
      },
      {
        value: 'webgl',
        label: '2D WebGL',
        disabled: true,
      },
      {
        value: 'dom',
        label: 'HTML',
      },
    ] as const;

    return new RadioGroup({
      title: 'Render engine',
      name: 'engine',
      value: this.config.getRender(),
      items: [...items],
      // onChange: (radio: RadioGroup) => {
      //   const engine = radio.getValue();
      //   this.config.setRender(engine as (typeof items)[number]['value']);
      // },
    });
  }

  private createControlsInfo() {
    const node = document.createElement('section');
    node.classList.add('options-controls');

    node.innerHTML = `
    <h3>Controls</h3>
    <div class="options-controls-keys">
      <kbd>W</kbd>, <kbd>A</kbd>, <kbd>S</kbd>, <kbd>D</kbd> - Moves<br/>
      <kbd>J</kbd> - Strike, <kbd>K</kbd> - Jump<br/>
      <kbd>L</kbd> - Defense, <kbd>Space</kbd> - Pause<br/>
      Gamepad is also supported
    </div>
    `;

    return node;
  }
}
