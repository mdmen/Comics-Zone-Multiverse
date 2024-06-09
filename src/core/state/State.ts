export interface State {
  update: (deltaStep: number, ...args: unknown[]) => void;
  enter: () => void;
  leave: () => void;
}
