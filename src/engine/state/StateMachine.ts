import { LinkedList } from '../linked-list/LinkedList';
import { isEmpty } from '../utils';
import { type State } from './types';

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

  addState(key: string, state: State) {
    this.states[key] = state;

    return this;
  }

  setState(key: string, ...args: unknown[]) {
    this.currentState.leave();
    this.currentState = this.states[key];
    this.currentState.enter(...args);

    this.stacked && this.updateStateStack(key);
  }

  updateStateStack(newStateKey: string) {
    if (this.prevStateKey) {
      this.stack.append(this.prevStateKey);
    }

    if (this.stack.size > this.stackMaxSize) {
      this.stack.shift();
    }

    this.prevStateKey = newStateKey;
  }

  setPrevState() {
    if (isEmpty(this.stack)) return;

    const key = this.stack.pop() as string;

    this.currentState.leave();
    this.currentState = this.states[key];
    this.currentState.enter();
  }

  getState(key?: string) {
    return key ? this.states[key] : this.currentState;
  }
}
