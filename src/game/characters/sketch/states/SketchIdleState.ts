import { CharacterMoves } from '../../moves';
import { SketchState, type SketchStateOptions } from '../SketchState';

export class SketchIdleState extends SketchState {
  constructor(options: SketchStateOptions) {
    super(options);

    // this.character.addAnimation({
    //   name: CharacterMoves.IDLE,
    //   frames: [],
    //   infinite: true,
    // });
  }

  protected onInput() {}

  onEnter() {
    this.character.getSounds().play('sketch', 'oh-yeah');
    this.character.setAnimation(CharacterMoves.IDLE);
  }

  onLeave() {}
}
