import { Emitter } from '@/core';

export enum GameEvents {
  GAME_RESET = 'GAME_RESET',
}

export const Events = new Emitter<keyof typeof GameEvents>();
