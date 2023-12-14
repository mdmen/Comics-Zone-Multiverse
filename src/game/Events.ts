import { Emitter } from '@/engine';

export enum GameEvents {
  GAME_RESET = 'GAME_RESET',
}

export const Events = new Emitter<keyof typeof GameEvents>();
