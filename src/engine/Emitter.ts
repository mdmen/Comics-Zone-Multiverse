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

  private getEventType(type: EventTypes): string {
    return `${this.prefix}${type}`;
  }

  public subscribe(type: EventTypes, listener: CustomEventListener): void {
    this.emitter.addEventListener(
      this.getEventType(type),
      listener as EventListener
    );
  }

  public unsubscribe(type: EventTypes, listener: CustomEventListener): void {
    this.emitter.removeEventListener(
      this.getEventType(type),
      listener as EventListener
    );
  }

  public emit(type: EventTypes, detail?: unknown): void {
    const event = new CustomEvent(this.getEventType(type), { detail });
    this.emitter.dispatchEvent(event);
  }
}
