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

  subscribe(observer: Observer) {
    this.observers.add(observer);
  }

  unsubscribe(observer: Observer) {
    this.observers.delete(observer);
  }

  notify(...args: unknown[]) {
    this.observers.forEach((observer) => {
      observer.update(...args);
    });
  }
}
