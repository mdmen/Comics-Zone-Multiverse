import type { State } from './State';
import type { StateTransition } from './StateTransition';

export class StateMachineNode<T extends State, K extends string> {
  constructor(
    public readonly state: T,
    public readonly transitions = new Set<StateTransition<K>>()
  ) {}

  public addTransition(transition: StateTransition<K>) {
    this.transitions.add(transition);
  }
}
