import { LinkedList } from '../linked-list/LinkedList';
import { isEmpty } from '../utils';
import type { State } from './State';

export class StateMachine<Key extends string = string> {
  private readonly states;
  private readonly stack = new LinkedList<Key>();
  private readonly stackMaxSize = 10;
  private readonly stacked;
  private prevStateKey!: Key;
  private currentState: State = {
    onUpdate() {},
    onEnter() {},
    onLeave() {},
  };

  constructor(initialStates = {}, stacked = false) {
    this.states = initialStates as Record<Key, State>;
    this.stacked = stacked;
  }

  private transitionTo(key: Key) {
    this.currentState.onLeave();
    this.currentState = this.states[key];
    this.currentState.onEnter();
  }

  addState(key: Key, state: State) {
    this.states[key] = state;

    return this;
  }

  setState(key: Key) {
    if (this.states[key] === this.currentState) return;

    this.transitionTo(key);

    this.stacked && this.updateStateStack(key);
  }

  updateStateStack(newStateKey: Key) {
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

    const key = this.stack.pop() as Key;
    this.transitionTo(key);
  }

  getState(key?: Key) {
    return key ? this.states[key] : this.currentState;
  }
}
