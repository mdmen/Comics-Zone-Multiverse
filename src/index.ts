import { onDOMReady, onGlobalError } from '@/engine';
import { startGame } from './game/startGame';
import { Modal } from './game/ui/Modal';

import './assets/styles/index.css';

onDOMReady(startGame);

onGlobalError(() => {
  const modal = new Modal();
  modal.show();
});
