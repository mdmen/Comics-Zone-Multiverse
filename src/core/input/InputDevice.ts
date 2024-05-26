import { InputKeyState } from './InputKeyState';

export abstract class InputDevice<T> {
  protected readonly keys = new Map<T, InputKeyState>();

  public isPressed(code: T) {
    return this.keys.get(code) === InputKeyState.Pressed;
  }

  public isHeld(code: T) {
    return this.keys.get(code) === InputKeyState.Hold;
  }

  public isReleased(code: T) {
    return this.keys.get(code) === InputKeyState.Released;
  }

  public vibrate() {}

  public abstract update(): void;
}
