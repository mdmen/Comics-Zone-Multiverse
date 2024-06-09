export class LinkedListNode<Value> {
  value;
  next: LinkedListNode<Value> | null = null;
  prev: LinkedListNode<Value> | null = null;

  constructor(value: Value) {
    this.value = value;
  }
}
