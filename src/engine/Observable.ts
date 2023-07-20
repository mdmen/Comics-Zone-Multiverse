interface Observer {
  update(...args: unknown[]): void;
}

interface Subject {
  subscribe(observer: Observer): void;
  unsubscribe(observer: Observer): void;
  notify(...args: unknown[]): void;
}

export class Observable implements Subject {
  private readonly observers = new Set<Observer>();

  public subscribe(observer: Observer): void {
    this.observers.add(observer);
  }

  public unsubscribe(observer: Observer): void {
    this.observers.delete(observer);
  }

  public notify(...args: unknown[]): void {
    this.observers.forEach((observer) => {
      observer.update(...args);
    });
  }
}
