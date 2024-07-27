import type { InputDeviceType } from './InputDeviceType';
import { InputKeyState } from './InputKeyState';

export abstract class InputDevice<T> {
  protected readonly keys = new Map<T, InputKeyState>();

  constructor(private readonly type: InputDeviceType) {}

  public isPressed(code: T) {
    return this.keys.get(code) === InputKeyState.Pressed;
  }

  public isHeld(code: T) {
    return this.keys.get(code) === InputKeyState.Hold;
  }

  public isReleased(code: T) {
    return this.keys.get(code) === InputKeyState.Released;
  }

  public getDeviceType() {
    return this.type;
  }

  public vibrate() {
    // do nothing
  }

  public abstract update(): void;
}
