import { Gamepad } from './Gamepad';
import { Logger } from '../../Logger';

export class GamepadManager {
  private static instance: GamepadManager;
  private readonly logger;
  private readonly gamepads = new Map<number, Gamepad>();

  private constructor() {
    this.logger = Logger.getInstance();

    this.bindEvents();
  }

  public static getInstance() {
    if (!GamepadManager.instance) {
      GamepadManager.instance = new GamepadManager();
    }

    return GamepadManager.instance;
  }

  private bindEvents() {
    document.addEventListener('gamepadconnected', this.handleConnected);
    document.addEventListener('gamepaddisconnected', this.handleDisconnected);
  }

  private handleConnected = (e: Event) => {
    const event = e as GamepadEvent;
    const { id, index } = event.gamepad;
    const gamepad = new Gamepad(index);

    this.gamepads.set(index, gamepad);

    this.logger.info(`Gamepad ${id} (${index}) connected`);
  };

  private handleDisconnected = (e: Event) => {
    const event = e as GamepadEvent;
    const { id, index } = event.gamepad;

    this.gamepads.delete(index);

    this.logger.info(`Gamepad ${id} (${index}) disconnected`);
  };

  public update() {
    this.gamepads.forEach((gamepad) => {
      gamepad.update();
    });
  }

  public getGamepad(index: number) {
    return this.gamepads.get(index) || null;
  }
}
