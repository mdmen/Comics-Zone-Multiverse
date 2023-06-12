import { Input as EngineInput } from '@/engine';

const controls = {
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
} satisfies Record<string, [string, number]>;

export class Input {
  private readonly input;

  constructor() {
    this.input = new EngineInput(controls);
  }

  public isUp(): boolean {
    return this.input.isPressed('up');
  }

  public isDown(): boolean {
    return this.input.isPressed('down');
  }

  public isLeft(): boolean {
    return this.input.isPressed('left');
  }

  public isRight(): boolean {
    return this.input.isPressed('right');
  }

  public isStart(): boolean {
    return this.input.isPressed('start');
  }

  public isButtonA(): boolean {
    return this.input.isPressed('A');
  }

  public isButtonB(): boolean {
    return this.input.isPressed('B');
  }

  public isButtonC(): boolean {
    return this.input.isPressed('C');
  }
}
