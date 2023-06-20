if (!navigator.getGamepads) {
  const faceButton1 = {
    pressed: true,
    touched: false,
    value: 1,
  } as GamepadButton;

  const faceButton2 = {
    pressed: false,
    touched: false,
    value: 0,
  } as GamepadButton;

  const gamepad = {
    id: 'gamepad',
    index: 0,
    mapping: '',
    connected: true,
    buttons: [faceButton1, faceButton2],
    axes: [],
    timestamp: 0,
    hapticActuators: [],
    vibrationActuator: null,
  } as Gamepad;

  navigator.getGamepads = function () {
    return [gamepad];
  };
}
