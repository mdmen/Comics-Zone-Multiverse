import { isEmpty } from '@/helpers/utils';

type Subscriber = (...args: unknown[]) => void;

export class Emitter {
  private events = new Map<string, Set<Subscriber>>();

  public subscribe(type: string, subscriber: Subscriber): void {
    let subscribers = this.events.get(type);

    if (!subscribers) {
      subscribers = new Set();
      this.events.set(type, subscribers);
    }

    subscribers.add(subscriber);
  }

  public unsubscribe(type: string, subscriber: Subscriber): void {
    const subscribers = this.events.get(type);

    if (!subscribers) return;

    subscribers.delete(subscriber);

    if (isEmpty(subscribers)) {
      this.events.delete(type);
    }
  }

  public emit(type: string, ...args: unknown[]): void {
    const subscribers = this.events.get(type);

    if (subscribers) {
      subscribers.forEach((fn) => fn(...args));
    }
  }
}
