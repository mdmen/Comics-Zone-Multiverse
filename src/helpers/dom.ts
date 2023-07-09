import { containerID } from '@/constants';

export function getAppContainer(): HTMLElement {
  const container = document.getElementById(containerID);

  if (!container) throw Error(`#${containerID} not found`);

  return container;
}
