import { InputDevice } from '../InputDevice';
import { InputKeyState } from '../InputKeyState';

export class Gamepad extends InputDevice<number> {
  private readonly index;
  private readonly pressedKeys = new Set<number>();

  constructor(index: number) {
    super();

    this.index = index;
  }

  private getGamepad() {
    const gamepads = navigator.getGamepads();

    return gamepads[this.index] || null;
  }

  public update() {
    const gamepad = this.getGamepad();

    if (!gamepad) {
      return;
    }

    gamepad.buttons.forEach((button, index) => {
      if (!button.pressed) {
        return;
      }

      const keyCode = this.keys.get(index);

      if (keyCode !== InputKeyState.Pressed && keyCode !== InputKeyState.Hold) {
        this.keys.set(index, InputKeyState.Pressed);
      } else if (keyCode === InputKeyState.Pressed) {
        this.keys.set(index, InputKeyState.Hold);
      }

      this.pressedKeys.add(index);
    });

    this.keys.forEach((state, code) => {
      if (state === InputKeyState.Released) {
        this.keys.set(code, InputKeyState.None);
      }

      if (!this.pressedKeys.has(code)) {
        this.keys.set(code, InputKeyState.Released);
      }
    });

    this.pressedKeys.clear();
  }

  public vibrate(
    effect: GamepadHapticEffectType = 'dual-rumble',
    options?: GamepadEffectParameters
  ) {
    const gamepad = this.getGamepad();

    if (!gamepad?.vibrationActuator) {
      return;
    }

    gamepad.vibrationActuator.playEffect(effect, {
      startDelay: 0,
      duration: 200,
      weakMagnitude: 0.6,
      strongMagnitude: 0.6,
      ...options,
    });
  }
}
