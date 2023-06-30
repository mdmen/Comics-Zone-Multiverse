export interface State {
  onUpdate: (...args: unknown[]) => void;
  onEnter: (...args: unknown[]) => void;
  onLeave: () => void;
}

export abstract class StateMachine {
  protected readonly states: Record<string, State>;
  protected currentState!: State;

  constructor(initialState = {}) {
    this.states = initialState;
  }

  public setState(state: string, ...args: unknown[]): void {
    this.currentState.onLeave();
    this.currentState = this.states[state];
    this.currentState.onEnter(...args);
  }

  public getState(): State {
    return this.currentState;
  }
}
