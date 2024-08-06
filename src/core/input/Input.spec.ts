import userEvent from '@testing-library/user-event';
import { Settings } from '../Settings';
import { Input } from './Input';

describe('Input (engine)', () => {
  const user = userEvent.setup();
  const controls = {
    A: ['KeyJ', 0],
    B: ['KeyK', 1],
  } satisfies Record<string, [string, number]>;

  test('Should response to keyboard input', async () => {
    Settings.set('gamepad', false);
    const input = new Input(controls);

    expect(input.isPressed('A')).toBe(false);

    await user.keyboard('[KeyJ>]');

    expect(input.isPressed('A')).toBe(true);

    await user.keyboard('[/KeyJ]');

    expect(input.isPressed('A')).toBe(false);
  });

  test('Should response to gamepad input', async () => {
    Settings.set('gamepad', true);
    const input = new Input(controls);

    expect(input.isPressed('A')).toBe(true);
    expect(input.isPressed('B')).toBe(false);
  });
});
