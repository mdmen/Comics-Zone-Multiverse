import { StateMachine } from './StateMachine';
import { type State } from './State';

class BaseState implements State {
  enter() {}
  leave() {}
  update() {}
}

class State1 extends BaseState {}
class State2 extends BaseState {}

describe('State machine (engine)', () => {
  test('Should be created', () => {
    const fsm = new StateMachine();

    expect(fsm.getState()).toBeTruthy();
  });

  test('Should set state', () => {
    const fsm = new StateMachine();
    const state1 = new State1();
    const state2 = new State2();

    fsm.addState('state1', state1);
    fsm.addState('state2', state2);

    fsm.setState('state1');
    expect(fsm.getState()).toBeInstanceOf(State1);

    fsm.setState('state2');
    expect(fsm.getState()).toBeInstanceOf(State2);
  });

  test('Should set previous state', () => {
    const fsm = new StateMachine({}, true);
    const state1 = new State1();
    const state2 = new State2();

    fsm.addState('state1', state1);
    fsm.addState('state2', state2);

    fsm.setState('state1');
    fsm.setState('state2');
    fsm.setPrevState();

    expect(fsm.getState()).toBeInstanceOf(State1);
  });
});
