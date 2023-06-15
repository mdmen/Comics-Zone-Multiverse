interface Logger {
  error(...args: unknown[]): void;
  log(...args: unknown[]): void;
}

export const Logger: Readonly<Logger> = {
  error(...args) {
    console.error(...args);
  },
  log(...args) {
    console.log(...args);
  },
};
