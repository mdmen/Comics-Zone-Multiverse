import { getAppContainer } from '@/helpers';
import { mountTogglers } from './ui/togglers/mountTogglers';

export function startGame(): void {
  const container = getAppContainer();

  mountTogglers({ container });
}
