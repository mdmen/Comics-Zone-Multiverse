if (!navigator.getGamepads) {
  const faceButton1 = createButton(true);
  const faceButton2 = createButton(false);

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

function createButton(pressed = false, touched = false): GamepadButton {
  return { pressed, touched, value: +pressed };
}
