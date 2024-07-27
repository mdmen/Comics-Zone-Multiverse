import { InputDevice } from '../InputDevice';
import { InputDeviceType } from '../InputDeviceType';
import { InputKeyState } from '../InputKeyState';

export class Keyboard extends InputDevice<string> {
  private static instance: Keyboard;
  private readonly nextStateKeys = new Map<string, InputKeyState>();

  private constructor() {
    super(InputDeviceType.Keyboard);

    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
    window.addEventListener('blur', this.handleBlur);
  }

  public static getInstance() {
    if (!Keyboard.instance) {
      Keyboard.instance = new Keyboard();
    }

    return Keyboard.instance;
  }

  private handleKeyDown = ({ code }: KeyboardEvent) => {
    this.nextStateKeys.set(code, InputKeyState.Pressed);
  };

  private handleKeyUp = ({ code }: KeyboardEvent) => {
    this.nextStateKeys.set(code, InputKeyState.Released);
  };

  private handleBlur = () => {
    this.keys.clear();
    this.nextStateKeys.clear();
  };

  public update() {
    this.nextStateKeys.forEach((state, code) => {
      this.keys.set(code, state);

      if (state === InputKeyState.Pressed) {
        this.nextStateKeys.set(code, InputKeyState.Hold);
        return;
      }

      if (state === InputKeyState.Released) {
        this.nextStateKeys.set(code, InputKeyState.None);
        return;
      }
    });
  }
}
