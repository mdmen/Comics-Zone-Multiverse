export class LinkedListNode<Value> {
  public value;
  public next: NodeType<Value> = null;
  public prev: NodeType<Value> = null;

  constructor(value: Value) {
    this.value = value;
  }
}

export type NodeType<Value> = LinkedListNode<Value> | null;
