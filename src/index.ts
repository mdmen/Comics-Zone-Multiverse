import { onDOMReady, onGlobalError } from './helpers';

import './assets/styles/index.css';

onDOMReady(() => {});

onGlobalError(() => {
  console.error('Something went wrong');
});
