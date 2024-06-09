import { LinkedListNode } from './LinkedListNode';

export class LinkedList<Value = unknown> {
  private head: LinkedListNode<Value> | null = null;
  private tail: LinkedListNode<Value> | null = null;
  private length = 0;

  public prepend(value: Value) {
    const node = new LinkedListNode(value);

    if (this.head) this.head.prev = node;
    this.head = node;
    if (!this.tail) this.tail = node;

    this.length++;
  }

  public append(value: Value) {
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

  public shift() {
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

  public pop() {
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

  public clear() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  public getHead() {
    return this.head?.value;
  }

  public getTail() {
    return this.tail?.value;
  }

  get size() {
    return this.length;
  }
}
