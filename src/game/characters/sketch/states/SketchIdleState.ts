import { CharacterMoves } from '../../CharacterMoves';
import { SketchState, type SketchStateOptions } from '../SketchState';

export class SketchIdleState extends SketchState {
  constructor(options: SketchStateOptions) {
    super(options);

    this.character.addAnimation({
      name: CharacterMoves.IDLE,
      frameNames: [],
      infinite: true,
    });
  }

  protected onInput(): void {}

  public onEnter(): void {
    this.character.getSounds().play('sketch', 'oh-yeah');
    this.character.setAnimation(CharacterMoves.IDLE);
  }

  public onLeave(): void {}
}
