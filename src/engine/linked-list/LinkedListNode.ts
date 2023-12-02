export class LinkedListNode<Value> {
  value;
  next: NodeType<Value> = null;
  prev: NodeType<Value> = null;

  constructor(value: Value) {
    this.value = value;
  }
}

export type NodeType<Value> = LinkedListNode<Value> | null;
