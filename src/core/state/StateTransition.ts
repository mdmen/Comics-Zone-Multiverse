export class StateTransition {
  constructor(
    public readonly from: string,
    public readonly to: string,
    public readonly condition: () => boolean
  ) {}
}
