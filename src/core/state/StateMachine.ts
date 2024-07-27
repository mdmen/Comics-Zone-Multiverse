import { Logger } from '../Logger';
import type { State } from './State';
import { StateMachineNode } from './StateMachineNode';
import type { StateTransition } from './StateTransition';

export class StateMachine<T extends State> {
  protected readonly logger = Logger.getInstance();
  protected readonly nodes = new Map<string, StateMachineNode<T>>();
  protected currentNode: StateMachineNode<T> | null = null;
  protected pendingTransition = false;
  protected nextTransitionTo: string | null = null;

  protected async startTransition(key: string) {
    this.pendingTransition = true;

    await this.currentNode?.state.leave?.();
    this.currentNode = this.nodes.get(key)!;
    await this.currentNode.state.enter?.();

    this.pendingTransition = false;
  }

  protected assertState(key: string) {
    if (!this.nodes.has(key)) {
      throw Error(`State "${key}" is not registered`);
    }
  }

  public register(key: string, state: T, initial = false) {
    const node = new StateMachineNode(state);

    this.nodes.set(key, node);
    node.state.register?.();

    if (initial) {
      this.currentNode = node;
    }

    return this;
  }

  public unregister(key: string) {
    this.assertState(key);

    if (this.currentNode === this.nodes.get(key)) {
      throw Error(`Cannot unregister current state "${key}"`);
    }

    if (this.pendingTransition && this.nextTransitionTo === key) {
      throw Error(`Cannot unregister scheduled state "${key}"`);
    }

    const node = this.nodes.get(key)!;
    node.state.unregister?.();

    this.nodes.delete(key);
  }

  public addTransition(transition: StateTransition) {
    this.assertState(transition.from);
    this.assertState(transition.to);

    const node = this.nodes.get(transition.from)!;
    node.transitions.add(transition);
  }

  public async set(key: string) {
    this.assertState(key);

    if (this.nodes.get(key) === this.currentNode) {
      this.logger.warn(`State "${key}" is already active`);
      return;
    }

    if (this.pendingTransition) {
      this.nextTransitionTo = key;
      return;
    }

    return this.startTransition(key);
  }

  public get(key?: string) {
    const node = key ? this.nodes.get(key) : this.currentNode;

    return node?.state ?? null;
  }

  protected hasScheduledTransition() {
    return !!this.nextTransitionTo;
  }

  protected invokeScheduledTransition() {
    this.set(this.nextTransitionTo!);
    this.nextTransitionTo = null;
  }

  public update(deltaStep: number) {
    if (!this.currentNode) {
      throw Error('There is no active state to update');
    }

    this.currentNode.state.update(deltaStep);

    if (this.pendingTransition) return;

    if (this.hasScheduledTransition()) {
      this.invokeScheduledTransition();
      return;
    }

    for (const transition of this.currentNode.transitions) {
      if (transition.condition()) {
        this.set(transition.to);
        return;
      }
    }
  }
}
