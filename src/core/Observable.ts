type Observer<T, U = unknown> = (event?: T, payload?: U) => void;

export class Observable<T, U = unknown> {
  private readonly observers = new Set<Observer<T, U>>();

  public subscribe(observer: Observer<T, U>) {
    this.observers.add(observer);
  }

  public subscribeOnce(observer: Observer<T>) {
    const unobservable = (event?: T, payload?: U) => {
      this.unsubscribe(unobservable);
      observer(event, payload);
    };

    this.subscribe(unobservable);
  }

  public unsubscribe(observer: Observer<T, U>) {
    this.observers.delete(observer);
  }

  public notify(event?: T, payload?: U) {
    this.observers.forEach((observer) => {
      observer(event, payload);
    });
  }

  public unsubscribeAll() {
    this.observers.clear();
  }
}
