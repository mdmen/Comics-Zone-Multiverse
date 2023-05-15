interface Keyboard {
  isPressed(code: string): boolean;
}

interface Gamepad {
  isPressed(code: number): boolean;
}

type Controls =
  | 'up'
  | 'down'
  | 'left'
  | 'right'
  | 'start'
  | 'A'
  | 'B'
  | 'C'
  | 'X'
  | 'Y'
  | 'Z';
type KeyboardKeyCode = string;
type GamepadButtonIndex = number;
type ControlsSet = [KeyboardKeyCode, GamepadButtonIndex];

export class Input {
  private static instance: Input;
  private readonly keyboard;
  private readonly gamepad;
  private controls: Record<Controls, ControlsSet> = {
    up: ['ArrowUp', 12],
    down: ['ArrowDown', 13],
    left: ['ArrowLeft', 14],
    right: ['ArrowRight', 15],
    start: ['Space', 9],
    A: ['KeyJ', 0],
    B: ['KeyK', 1],
    C: ['KeyL', 2],
    X: ['KeyU', 3],
    Y: ['KeyI', 4],
    Z: ['KeyO', 5],
  };

  private constructor(keyboard: Keyboard, gamepad?: Gamepad) {
    this.keyboard = keyboard;
    this.gamepad = gamepad;
  }

  public static getInstance(keyboard: Keyboard, gamepad?: Gamepad): Input {
    if (!Input.instance) {
      Input.instance = new Input(keyboard, gamepad);
    }

    return Input.instance;
  }

  private isPressed(control: Controls): boolean {
    const [keyboardKey, gamepadButtonIndex] = this.controls[control];

    return (
      this.keyboard.isPressed(keyboardKey) ||
      !!this.gamepad?.isPressed(gamepadButtonIndex)
    );
  }

  public isUp(): boolean {
    return this.isPressed('up');
  }

  public isDown(): boolean {
    return this.isPressed('down');
  }

  public isLeft(): boolean {
    return this.isPressed('left');
  }

  public isRight(): boolean {
    return this.isPressed('right');
  }

  public isStart(): boolean {
    return this.isPressed('start');
  }

  public isButtonA(): boolean {
    return this.isPressed('A');
  }

  public isButtonB(): boolean {
    return this.isPressed('B');
  }

  public isButtonC(): boolean {
    return this.isPressed('C');
  }
}
