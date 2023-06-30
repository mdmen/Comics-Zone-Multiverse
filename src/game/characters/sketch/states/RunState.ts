import { CharacterState } from '../../CharacterState';
import { Moves } from '../../moves';

export class RunState extends CharacterState {
  onInit(): void {
    this.character.addAnimation({
      name: Moves.run,
      frameNames: [],
      infinite: true,
    });
  }

  onEnter(): void {
    this.character.setAnimation(Moves.run);
  }

  onLeave(): void {}

  onUpdate(): void {}
}
