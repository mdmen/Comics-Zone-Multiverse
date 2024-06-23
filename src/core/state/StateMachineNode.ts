import type { State } from './State';
import type { StateTransition } from './StateTransition';

export class StateMachineNode<T extends State> {
  constructor(
    public readonly state: T,
    public readonly transitions = new Set<StateTransition>()
  ) {}

  public addTransition(transition: StateTransition) {
    this.transitions.add(transition);
  }
}
