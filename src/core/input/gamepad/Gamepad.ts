import { InputDevice } from '../InputDevice';
import { InputDeviceType } from '../InputDeviceType';
import { InputKeyState } from '../InputKeyState';

export class Gamepad extends InputDevice<number> {
  private readonly index;
  private readonly pressedKeys = new Set<number>();

  constructor(index: number) {
    super(InputDeviceType.Gamepad);

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

      this.pressedKeys.add(index);

      const code = this.keys.get(index);

      if (code !== InputKeyState.Pressed && code !== InputKeyState.Hold) {
        this.keys.set(index, InputKeyState.Pressed);
      } else if (code === InputKeyState.Pressed) {
        this.keys.set(index, InputKeyState.Hold);
      }
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
