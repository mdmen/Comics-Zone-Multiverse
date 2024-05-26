import userEvent from '@testing-library/user-event';
import { Keyboard } from './Keyboard';

describe('Keyboard (engine)', () => {
  test('Should response to user input', async () => {
    const user = userEvent.setup();
    const keyboard = Keyboard.getInstance();

    expect(keyboard.isPressed('ShiftLeft')).toBe(false);
    expect(keyboard.isPressed('KeyW')).toBe(false);

    await user.keyboard('[ShiftLeft>][KeyW>]');

    expect(keyboard.isPressed('ShiftLeft')).toBe(true);
    expect(keyboard.isPressed('KeyW')).toBe(true);

    await user.keyboard('[/ShiftLeft]');

    expect(keyboard.isPressed('ShiftLeft')).toBe(false);
    expect(keyboard.isPressed('KeyW')).toBe(true);

    await user.keyboard('[/KeyW]');

    expect(keyboard.isPressed('ShiftLeft')).toBe(false);
    expect(keyboard.isPressed('KeyW')).toBe(false);
  });
});
