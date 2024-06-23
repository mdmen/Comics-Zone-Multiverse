type Observer<T> = (payload: T) => void;

export class Observable<T = unknown> {
  private readonly observers = new Set<Observer<T>>();

  public subscribe(observer: Observer<T>) {
    this.observers.add(observer);
  }

  public subscribeOnce(observer: Observer<T>) {
    const unobservable = (payload: T) => {
      this.unsubscribe(unobservable);
      observer(payload);
    };

    this.subscribe(unobservable);
  }

  public unsubscribe(observer: Observer<T>) {
    this.observers.delete(observer);
  }

  public notify(payload: T) {
    this.observers.forEach((observer) => {
      observer(payload);
    });
  }

  public unsubscribeAll() {
    this.observers.clear();
  }
}
