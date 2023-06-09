import { isProduction } from '@/helpers/utils';
import { Settings } from '../Settings';

interface Logger {
  error(...args: unknown[]): void;
  log(...args: unknown[]): void;
}

export const Logger: Readonly<Logger> = {
  error(...args) {
    console.error(...args);
  },
  log(...args) {
    if (isProduction() && Settings.getValue('suppressProductionLogs')) return;

    console.log(...args);
  },
};
