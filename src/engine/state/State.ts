export interface State {
  onUpdate: (...args: unknown[]) => void;
  onEnter: (...args: unknown[]) => void;
  onLeave: () => void;
}
