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

  enter() {
    this.character.getSounds().play('sketch', 'oh-yeah');
    this.character.setAnimation(CharacterMoves.IDLE);
  }

  leave() {}
}
