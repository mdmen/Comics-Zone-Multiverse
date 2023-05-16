import { isProduction, isSuppressProductionLogs } from '../constants/app';

interface Logger {
  error(...args: unknown[]): void;
  log(...args: unknown[]): void;
}

export const Logger: Readonly<Logger> = {
  error(...args) {
    console.error(...args);
  },
  log(...args) {
    if (isProduction && isSuppressProductionLogs) return;

    console.log(...args);
  },
};
