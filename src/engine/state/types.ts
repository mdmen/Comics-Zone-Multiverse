export interface State {
  update: (step: number) => void;
  enter: (...args: unknown[]) => void;
  leave: () => void;
}
