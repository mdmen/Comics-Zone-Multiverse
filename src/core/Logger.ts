enum LogLevel {
  Debug = 0,
  Info = 5,
  Warn = 10,
  Error = 15,
}

export class Logger {
  private static instance: Logger;
  private logLevel = LogLevel.Warn;

  private constructor() {}

  public static getInstance() {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }

    return Logger.instance;
  }

  public setLevel(level: LogLevel) {
    this.logLevel = level;
  }

  public debug(...args: unknown[]) {
    if (this.logLevel > LogLevel.Debug) {
      return;
    }

    console.log(...args);
  }

  public info(...args: unknown[]) {
    if (this.logLevel > LogLevel.Info) {
      return;
    }

    console.log(...args);
  }

  public warn(...args: unknown[]) {
    if (this.logLevel > LogLevel.Warn) {
      return;
    }

    console.warn(...args);
  }

  public error(...args: unknown[]) {
    if (this.logLevel > LogLevel.Error) {
      return;
    }

    console.error(...args);
  }
}
