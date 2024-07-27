export interface State {
  update: (deltaStep: number, ...args: never[]) => void;
  register?: () => void;
  unregister?: () => void;
  enter?: () => Promise<void> | void;
  leave?: () => Promise<void> | void;
}
