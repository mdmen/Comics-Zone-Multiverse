import { CharacterMoves } from '../../CharacterMoves';
import { SketchState, type SketchStateOptions } from '../SketchState';

export class SketchIdleState extends SketchState {
  constructor(options: SketchStateOptions) {
    super(options);

    this.character.addAnimation({
      name: CharacterMoves.IDLE,
      frames: [],
      infinite: true,
    });
  }

  protected onInput(): void {}

  public enter(): void {
    this.character.getSounds().play('sketch', 'oh-yeah');
    this.character.setAnimation(CharacterMoves.IDLE);
  }

  public leave(): void {}
}
