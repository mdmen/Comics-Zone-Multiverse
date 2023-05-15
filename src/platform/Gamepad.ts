export class Gamepad {
  private static instance: Gamepad;
  private gamepad: globalThis.Gamepad | null = null;
  private readonly gamepadScanTimeout = 500;

  private constructor() {
    this.scanForGamepad = this.scanForGamepad.bind(this);
    this.handleConnected = this.handleConnected.bind(this);
    this.handleDisconnected = this.handleDisconnected.bind(this);

    this.detectGamepad();
    this.bindEvents();
  }

  private bindEvents() {
    window.addEventListener('gamepadconnected', this.handleConnected);
    window.addEventListener('gamepaddisconnected', this.handleDisconnected);

    if (this.shouldScanForGamepad()) {
      this.scanForGamepad();
    }
  }

  private detectGamepad() {
    this.gamepad = navigator.getGamepads().find(Boolean) || null;
  }

  private shouldScanForGamepad() {
    return !('ongamepadconnected' in window);
  }

  private scanForGamepad() {
    this.detectGamepad();

    setTimeout(this.scanForGamepad, this.gamepadScanTimeout);
  }

  private handleConnected() {
    this.detectGamepad();
  }

  private handleDisconnected() {
    this.gamepad = null;
  }

  public static getInstance(): Gamepad {
    if (!Gamepad.instance) {
      Gamepad.instance = new Gamepad();
    }

    return Gamepad.instance;
  }

  public isPressed(code: number): boolean {
    return !!this.gamepad?.buttons[code]?.pressed;
  }
}
