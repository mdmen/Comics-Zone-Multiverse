export class StateTransition {
  constructor(
    public readonly from: string,
    public readonly to: string,
    public readonly condition: () => boolean
  ) {
    if (from === to) {
      throw Error(`Transition target should be different from "${from}"`);
    }
  }
}
