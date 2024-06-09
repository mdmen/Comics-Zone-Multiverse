import { LinkedList } from '../list';
import { isEmpty } from '../utils';
import type { State } from './State';
import { StateMachineNode } from './StateMachineNode';
import type { StateTransition } from './StateTransition';

export abstract class StateMachine<
  T extends State = State,
  K extends string = string
> {
  private readonly states = new Map<K, StateMachineNode<T, K>>();
  private currentNode: StateMachineNode<T, K> | null = null;
  private readonly stack = new LinkedList<K>();
  private readonly stackMaxSize = 10;

  private startTransition(key: K) {
    const node = this.states.get(key);

    if (!node) return;

    this.currentNode?.state.leave();
    this.currentNode = node;
    this.currentNode.state.enter();
  }

  public register(key: K, state: T) {
    this.states.set(key, new StateMachineNode(state));

    return this;
  }

  public addTransition(transition: StateTransition<K>) {
    const node = this.states.get(transition.from);

    if (!node) {
      throw Error(`State "${transition.from}" is not registered`);
    }

    node.addTransition(transition);
  }

  public set(key: K) {
    if (this.stack.getTail() === key) return;

    this.stack.append(key);

    if (this.stack.size > this.stackMaxSize) {
      this.stack.shift();
    }
  }

  public setPrev() {
    if (isEmpty(this.stack)) return;

    const key = this.stack.pop() as K;
    this.startTransition(key);
  }

  public update(deltaStep: number) {
    if (!this.currentNode) return;

    for (const transition of this.currentNode.transitions) {
      if (transition.condition()) {
        this.startTransition(transition.to);
      }
    }

    this.currentNode.state.update(deltaStep);
  }

  public destroy() {
    this.states.clear();
    this.stack.clear();
    this.currentNode = null;
  }
}
