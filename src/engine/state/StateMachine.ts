import { LinkedList } from '../list/LinkedList';
import { isEmpty } from '../utils';
import { type State } from './State';

const defaultState: State = {
  update() {},
  enter() {},
  leave() {},
};

export class StateMachine {
  protected readonly states: Record<string, State>;
  private readonly stack = new LinkedList<string>();
  private readonly stackMaxSize = 15;
  private readonly stacked;
  private currentState = defaultState;
  private prevStateKey!: string;

  constructor(initialStates = {}, stacked = false) {
    this.states = initialStates;
    this.stacked = stacked;
  }

  public addState(key: string, state: State): StateMachine {
    this.states[key] = state;

    return this;
  }

  public setState(key: string, ...args: unknown[]): void {
    this.currentState.leave();
    this.currentState = this.states[key];
    this.currentState.enter(...args);

    this.stacked && this.updateStateStack(key);
  }

  public updateStateStack(newStateKey: string): void {
    if (this.prevStateKey) {
      this.stack.append(this.prevStateKey);
    }

    if (this.stack.size > this.stackMaxSize) {
      this.stack.shift();
    }

    this.prevStateKey = newStateKey;
  }

  public setPrevState(): void {
    if (isEmpty(this.stack)) return;

    const key = this.stack.pop() as string;

    this.currentState.leave();
    this.currentState = this.states[key];
    this.currentState.enter();
  }

  public getState(): State {
    return this.currentState;
  }
}
