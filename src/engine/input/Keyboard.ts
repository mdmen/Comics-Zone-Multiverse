export class Keyboard {
  private static instance: Keyboard;
  private pressedKeys = new Map<string, boolean>();

  private constructor() {
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

  public static getInstance(): Keyboard {
    if (!Keyboard.instance) {
      Keyboard.instance = new Keyboard();
    }

    return Keyboard.instance;
  }

  public isPressed(code: string): boolean {
    return this.pressedKeys.has(code);
  }
}
