export interface State {
  onUpdate: (timeElapsed: number) => void;
  onEnter?: (...args: unknown[]) => void;
  onLeave?: (...args: unknown[]) => void;
}

export class StateMachine {
  private currentState: State;

  constructor(initialState: State, ...enterArgs: unknown[]) {
    this.currentState = initialState;
    this.currentState.onEnter?.(...enterArgs);
  }

  public setState(newState: State, ...enterArgs: unknown[]): void {
    this.currentState.onLeave?.();
    this.currentState = newState;
    this.currentState.onEnter?.(...enterArgs);
  }

  public getState(): State {
    return this.currentState;
  }
}
