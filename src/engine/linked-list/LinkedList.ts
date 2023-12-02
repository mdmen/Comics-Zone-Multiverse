import { LinkedListNode, type NodeType } from './LinkedListNode';

export class LinkedList<Value = unknown> {
  private head: NodeType<Value> = null;
  private tail: NodeType<Value> = null;
  private length = 0;

  prepend(value: Value) {
    const node = new LinkedListNode(value);

    if (this.head) this.head.prev = node;
    this.head = node;
    if (!this.tail) this.tail = node;

    this.length++;
  }

  append(value: Value) {
    const node = new LinkedListNode(value);

    this.length++;

    if (!this.tail) {
      this.head = node;
      this.tail = node;
      return;
    }

    this.tail.next = node;
    node.prev = this.tail;
    this.tail = node;
  }

  shift() {
    if (!this.head) return null;

    const head = this.head;

    if (this.head.next) {
      this.head = this.head.next;
      this.head.prev = null;
    } else {
      this.head = null;
      this.tail = null;
    }

    this.length--;

    return head.value;
  }

  pop() {
    if (!this.tail) return null;

    const tail = this.tail;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;

      return tail.value;
    }

    this.tail = this.tail.prev;
    this.tail!.next = null;

    this.length--;

    return tail.value;
  }

  clear() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  get size() {
    return this.length;
  }
}
