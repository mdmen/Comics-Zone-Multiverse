type Observer<T> = (event?: T) => void;

export class Observable<T> {
  private readonly observers = new Set<Observer<T>>();

  public subscribe(observer: Observer<T>) {
    this.observers.add(observer);
  }

  public subscribeOnce(observer: Observer<T>) {
    const unobservable = (event?: T) => {
      this.unsubscribe(unobservable);
      observer(event);
    };

    this.subscribe(unobservable);
  }

  public unsubscribe(observer: Observer<T>) {
    this.observers.delete(observer);
  }

  public notify(event?: T) {
    this.observers.forEach((observer) => {
      observer(event);
    });
  }

  public unsubscribeAll() {
    this.observers.clear();
  }
}
