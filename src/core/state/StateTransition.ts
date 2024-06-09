export class StateTransition<T extends string> {
  constructor(
    public readonly from: T,
    public readonly to: T,
    public readonly condition: () => boolean
  ) {}
}
