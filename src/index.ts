import { onDOMReady } from '@/engine';
import { startGame } from './game/startGame';

import './assets/styles/index.css';

onDOMReady(startGame);
