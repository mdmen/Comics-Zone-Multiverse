import { CharacterState } from '../../CharacterState';
import { Moves } from '../../moves';

export class IdleState extends CharacterState {
  onInit(): void {
    this.character.addAnimation({
      name: Moves.idle,
      frameNames: [],
      infinite: true,
    });
  }

  onEnter(): void {
    this.character.setAnimation(Moves.idle);
  }

  onLeave(): void {}

  onUpdate(): void {}
}
