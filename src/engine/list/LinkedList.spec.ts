import { LinkedList } from './LinkedList';

describe('Linked list (engine)', () => {
  test('Should be created', () => {
    const list = new LinkedList();

    expect(list.size).toBe(0);
  });

  test('Should append value', () => {
    const list = new LinkedList();

    list.append(1);
    list.append(2);

    expect(list.size).toBe(2);
  });

  test('Should prepend value', () => {
    const list = new LinkedList();

    list.prepend(1);
    list.prepend(2);

    expect(list.size).toBe(2);
  });

  test('Should clear', () => {
    const list = new LinkedList();

    list.prepend(1);
    list.prepend(2);
    list.clear();

    expect(list.size).toBe(0);
  });

  test('Should pop value', () => {
    const list = new LinkedList();

    list.prepend(1);
    list.append(2);
    list.prepend(3);
    list.append(4);

    expect(list.pop()).toBe(4);
  });

  test('Should shift list', () => {
    const list = new LinkedList();

    list.append(1);
    list.prepend(2);
    list.append(3);
    list.prepend(4);

    expect(list.shift()).toBe(4);
  });
});
