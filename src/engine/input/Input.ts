import { Gamepad } from './Gamepad';
import { Keyboard } from './Keyboard';
import { Settings } from '../Settings';

type KeyboardKeyCode = string;
type GamepadButtonIndex = number;
type ControlsSet = [KeyboardKeyCode, GamepadButtonIndex];
type Controls<Names extends string> = Record<Names, ControlsSet>;

export class Input<Names extends string = string> {
  private readonly keyboard;
  private readonly gamepad;
  private controls;

  constructor(controls: Controls<Names>) {
    this.controls = controls;

    this.keyboard = new Keyboard();
    this.gamepad = Settings.get('gamepad') ? new Gamepad() : null;
  }

  isPressed(control: Names) {
    const [keyboardKey, gamepadButtonIndex] = this.controls[control];

    return (
      this.keyboard.isPressed(keyboardKey) ||
      !!this.gamepad?.isPressed(gamepadButtonIndex)
    );
  }

  setKeyboardControl(control: Names, key: KeyboardKeyCode) {
    this.controls[control][0] = key;
  }

  setGamepadControl(control: Names, button: GamepadButtonIndex) {
    this.controls[control][1] = button;
  }
}
