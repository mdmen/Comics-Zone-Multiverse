import { Settings } from './Settings';

interface CustomEventListener {
  (event: CustomEvent): void;
}

export class Emitter<EventTypes extends string> {
  private readonly emitter;
  private readonly prefix;

  constructor() {
    this.emitter = new EventTarget();
    this.prefix = Settings.get('eventsPrefix');
  }

  private getEventType(type: EventTypes) {
    return `${this.prefix}${type}`;
  }

  subscribe(type: EventTypes, listener: CustomEventListener) {
    this.emitter.addEventListener(
      this.getEventType(type),
      listener as EventListener
    );
  }

  unsubscribe(type: EventTypes, listener: CustomEventListener) {
    this.emitter.removeEventListener(
      this.getEventType(type),
      listener as EventListener
    );
  }

  emit(type: EventTypes, detail?: unknown) {
    const event = new CustomEvent(this.getEventType(type), { detail });
    this.emitter.dispatchEvent(event);
  }
}
