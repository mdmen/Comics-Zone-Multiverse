export interface State {
  onUpdate: (...args: unknown[]) => void;
  onEnter: () => void;
  onLeave: () => void;
}
