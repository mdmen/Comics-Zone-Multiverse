import { LinkedList } from '../list';
import type { State } from './State';
import { StateMachine } from './StateMachine';

export class StackedStateMachine<T extends State> extends StateMachine<T> {
  private readonly stack = new LinkedList<string>();
  private prevStateKey: string | null = null;
  private nextTransitionToPrev = false;

  constructor(private readonly stackMaxSize = 10) {
    super();

    if (stackMaxSize <= 0) {
      throw Error(
        'Maximum stack size in StackedStateMachine should be greater than 0'
      );
    }
  }

  public override async set(key: string) {
    await super.set(key);

    this.updateStack(key);
  }

  public override unregister(key: string) {
    this.assertState(key);

    if (
      this.pendingTransition &&
      this.nextTransitionToPrev &&
      key === this.stack.getTail()
    ) {
      throw Error(`Cannot unregister scheduled previous state "${key}"`);
    }

    super.unregister(key);
  }

  private updateStack(key: string) {
    if (this.stack.getTail() === key) return;

    if (this.prevStateKey) {
      this.stack.append(this.prevStateKey);

      if (this.stack.size > this.stackMaxSize) {
        this.stack.shift();
      }
    }

    this.prevStateKey = key;
  }

  public async setPrev() {
    const stateKey = this.stack.getTail();
    if (!stateKey) return;

    if (this.pendingTransition) {
      this.nextTransitionToPrev = true;
      return;
    }

    await this.startTransition(stateKey);

    this.stack.pop();
  }

  protected override hasScheduledTransition() {
    return super.hasScheduledTransition() || this.nextTransitionToPrev;
  }

  protected override invokeScheduledTransition() {
    if (this.nextTransitionTo) {
      this.set(this.nextTransitionTo);
      this.nextTransitionTo = null;
      this.nextTransitionToPrev = false;
      return;
    }

    if (this.nextTransitionToPrev) {
      this.setPrev();
      this.nextTransitionToPrev = false;
      return;
    }
  }
}
