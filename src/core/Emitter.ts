interface CustomEventListener extends EventListener {
  (event: CustomEvent): void;
}

export class Emitter<EventTypes extends string> {
  private readonly emitter = new EventTarget();

  public on(type: EventTypes, listener: CustomEventListener) {
    this.emitter.addEventListener(type, listener);
  }

  public once(type: EventTypes, listener: CustomEventListener) {
    this.emitter.addEventListener(type, listener, { once: true });
  }

  public off(type: EventTypes, listener: CustomEventListener) {
    this.emitter.removeEventListener(type, listener);
  }

  public emit(type: EventTypes, detail?: unknown) {
    const event = new CustomEvent(type, { detail });

    this.emitter.dispatchEvent(event);
  }
}
