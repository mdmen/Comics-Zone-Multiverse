import { Config } from '../Config';
import { Toggler } from './Toggler';
import { FlexContainer } from './FlexContainer';
import { Tooltip } from './Tooltip';
import { type Node } from './Node';

interface Options {
  container: HTMLElement;
  config: Config;
}

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
      classNames: ['settings'],
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
        classNames: ['settings-item'],
        onToggle: (toggler: Toggler) => {
          const state = toggler.isActive() ? 'on' : 'off';
          this.config.setSound(state);

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
        classNames: ['settings-item'],
        onToggle: (toggler: Toggler) => {
          const theme = toggler.isActive() ? 'dark' : 'light';
          this.config.setTheme(theme);

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
    const canvasTooltip = 'Change render to DOM';
    const domTooltip = 'Change render to CANVAS';

    const tooltip = new Tooltip({
      content: new Toggler({
        defaultState: canvas ? 'on' : 'off',
        activeContent: '⚙️',
        inactiveContent: '⚙️',
        classNames: ['settings-item'],
        onToggle: (toggler: Toggler) => {
          tooltip.setTooltip(toggler.isActive() ? canvasTooltip : domTooltip);
        },
      }),
      tooltip: canvas ? canvasTooltip : domTooltip,
      right: true,
    });

    return tooltip;
  }
}
