import { getAppContainer } from '@/helpers';
import { UISettings } from './ui/UISettings';
import { Config } from './Config';
import { Audio, onGlobalError } from '@/engine';
import { Modal } from './ui/components';

export function startGame(): void {
  const container = getAppContainer();
  const audio = new Audio();
  const config = new Config(audio);

  new UISettings({ container, config });

  onGlobalError(() => {
    const modal = new Modal({
      container,
      heading: '❗️ Error has been occurred',
      content: 'Something went wrong. The game may work incorrectly',
    });

    modal.show();
  });
}
