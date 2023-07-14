import { Config } from '../Config';
import { Toggler, FlexContainer, type Node, Tooltip } from './components';

interface Options {
  container: HTMLElement;
  config: Config;
}

const containerClassNames = ['settings'];
const tooltipClassNames = ['settings-item'];

export class UISettings {
  private readonly config;

  constructor({ container, config }: Options) {
    this.config = config;

    const togglers = new FlexContainer({
      items: [
        this.createSoundToggler(),
        this.createThemeToggler(),
        this.createEngineToggler(),
      ],
      classNames: containerClassNames,
    });

    container.append(togglers.getNode());
  }

  private createSoundToggler(): Node {
    const soundState = this.config.getSound();
    const onTooltip = 'Mute';
    const offTooltip = 'Unmute';

    const tooltip = new Tooltip({
      content: new Toggler({
        defaultState: soundState,
        activeContent: '🔊',
        inactiveContent: '🔈',
        label: 'Mute/unmute',
        classNames: tooltipClassNames,
        onToggle: (toggler: Toggler) => {
          this.config.setSound(toggler.isActive() ? 'on' : 'off');
          tooltip.setTooltip(toggler.isActive() ? onTooltip : offTooltip);
        },
      }),
      tooltip: soundState === 'on' ? onTooltip : offTooltip,
    });

    return tooltip;
  }

  private createThemeToggler(): Node {
    const dark = this.config.getTheme() === 'dark';
    const darkThemeTooltip = 'Dark theme';
    const lightThemeTooltip = 'Light theme';

    const tooltip = new Tooltip({
      content: new Toggler({
        defaultState: dark ? 'on' : 'off',
        activeContent: '🌃',
        inactiveContent: '🌆',
        label: 'Change theme',
        classNames: tooltipClassNames,
        onToggle: (toggler: Toggler) => {
          this.config.setTheme(toggler.isActive() ? 'dark' : 'light');
          tooltip.setTooltip(
            toggler.isActive() ? darkThemeTooltip : lightThemeTooltip
          );
        },
      }),
      tooltip: dark ? darkThemeTooltip : lightThemeTooltip,
    });

    return tooltip;
  }

  private createEngineToggler(): Node {
    const canvas = this.config.getRender() === 'canvas';
    const canvasTooltip = 'Change render engine to DOM';
    const domTooltip = 'Change render engine to canvas';

    const tooltip = new Tooltip({
      content: new Toggler({
        defaultState: canvas ? 'on' : 'off',
        activeContent: '🖥️',
        inactiveContent: '📺',
        label: 'Change render engine',
        classNames: tooltipClassNames,
        onToggle: (toggler: Toggler) => {
          this.config.setRender(toggler.isActive() ? 'canvas' : 'dom');
          tooltip.setTooltip(toggler.isActive() ? canvasTooltip : domTooltip);
        },
      }),
      tooltip: canvas ? canvasTooltip : domTooltip,
      right: true,
      classNames: ['tooltip-engine'],
    });

    return tooltip;
  }
}