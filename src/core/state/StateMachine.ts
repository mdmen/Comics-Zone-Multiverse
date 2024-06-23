import { LinkedList } from '../list';
import { isEmpty } from '../utils';
import type { State } from './State';
import { StateMachineNode } from './StateMachineNode';
import type { StateTransition } from './StateTransition';

export class StateMachine<T extends State> {
  private readonly nodes = new Map<string, StateMachineNode<T>>();
  private currentNode: StateMachineNode<T> | null = null;
  private readonly stack = new LinkedList<string>();
  private prevStateKey: string | null = null;

  constructor(private readonly stackMaxSize = 0) {}

  private startTransition(key: string) {
    this.currentNode?.state.leave();
    this.currentNode = this.nodes.get(key) as StateMachineNode<T>;
    this.currentNode.state.enter();
  }

  private assertState(key: string) {
    if (!this.nodes.has(key)) {
      throw Error(`State "${key}" is not registered`);
    }
  }

  public register(key: string, state: T) {
    this.nodes.set(key, new StateMachineNode(state));

    return this;
  }

  public addTransition(transition: StateTransition) {
    this.assertState(transition.from);
    this.assertState(transition.to);

    this.nodes.get(transition.from)!.addTransition(transition);
  }

  public set(key: string) {
    this.assertState(key);

    if (this.nodes.get(key) === this.currentNode) return;

    this.startTransition(key);
    this.stackMaxSize && this.updateStack(key);
  }

  public get(key: string) {
    return this.nodes.get(key)?.state || null;
  }

  public getCurrent() {
    return this.currentNode?.state || null;
  }

  private updateStack(key: string) {
    if (this.prevStateKey) {
      this.stack.append(this.prevStateKey);

      if (this.stack.size > this.stackMaxSize) {
        this.stack.shift();
      }
    }

    this.prevStateKey = key;
  }

  public setPrev() {
    if (isEmpty(this.stack)) return;

    const stateKey = this.stack.pop() as string;
    this.startTransition(stateKey);
  }

  public update(deltaStep: number) {
    if (!this.currentNode) return;

    for (const transition of this.currentNode.transitions) {
      if (transition.condition()) {
        this.startTransition(transition.to);
        return;
      }
    }

    this.currentNode.state.update(deltaStep);
  }
}
