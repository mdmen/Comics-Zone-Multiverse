export class Keyboard {
  private pressedKeys = new Map<string, boolean>();

  constructor() {
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);

    this.bindEvents();
  }

  private bindEvents() {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
  }

  private handleKeyDown({ code }: KeyboardEvent) {
    this.pressedKeys.set(code, true);
  }

  private handleKeyUp({ code }: KeyboardEvent) {
    this.pressedKeys.delete(code);
  }

  public isPressed(code: string): boolean {
    return this.pressedKeys.has(code);
  }
}
