interface Observer<T = unknown> {
  listen(observable?: T, ...args: unknown[]): void;
}

export class Observable<T = unknown> {
  private readonly observers = new Set<Observer<T>>();

  subscribe(observer: Observer<T>) {
    this.observers.add(observer);
  }

  unsubscribe(observer: Observer<T>) {
    this.observers.delete(observer);
  }

  notify(observable?: T, ...args: unknown[]) {
    this.observers.forEach((observer) => {
      observer.listen(observable, ...args);
    });
  }

  unsubscribeAll() {
    this.observers.clear();
  }
}
