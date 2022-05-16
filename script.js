'use strict';

class StackNode {
  constructor(value) {
    this.value = value;
    this.prev = null;
  }
}

class Stack {
  constructor(size) {
    if (size === undefined) {
      this._MAX_SIZE = 10;
    } else if (!isValidNumber(size)) {
      throw new Error('Ошибка: параметр не является валидным числом!');
    } else {
      this._MAX_SIZE = size;
    }

    this._size = 0;
    this._tail = null;
  }

  push(value) {
    if (this._size === this._MAX_SIZE) {
      throw new Error('Ошибка: Стек переполнен!');
    }

    const node = new StackNode(value);

    if (this._tail) {
      node.prev = this._tail;
    }

    this._tail = node;
    this._size++;
  }

  pop() {
    if (this._size === 0) {
      throw new Error('Ошибка: Стек пуст!');
    }

    const deletedElement = this._tail.value;

    this._tail = this._tail.prev;
    this._size--;

    return deletedElement;
  }

  peek() {
    if (this._size === 0) {
      return null;
    }

    const lastElement = this._tail.value;

    return lastElement;
  }

  isEpmty() {
    return this._size === 0;
  }

  toArray() {
    let current = this._tail;
    const array = [];

    while (current) {
      array.push(current.value);
      current = current.prev;
    }

    return array.reverse();
  }

  static fromIterable(iterable) {
    if (!isIterable(iterable)) {
      throw new Error('Ошибка: Сущность не является итерируемой!');
    }

    const stack = new Stack(iterable.length);

    for (let elem of iterable) {
      stack.push(elem);
    }

    return stack;
  }
}

function isValidNumber(value) {
  const isNumber = typeof value === 'number';

  return isNumber && isFinite(value);
}

function isIterable(value) {
  return typeof value[Symbol.iterator] === 'function';
}

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this._head = null;
    this._size = 0;
  }

  append(value) {
    const node = new Node(value);

    if (this._size === 0) {
      this._head = node;
      this._size++;

      return;
    }

    let current = this._head;

    while (current.next) {
      current = current.next;
    }

    current.next = node;
    this._size++;
  }

  prepend(value) {
    const node = new Node(value);

    node.next = this._head;
    this._head = node;
    this._size++;
  }

  find(value) {
    let current = this._head;

    while (current) {
      if (current.value === value) {
        return current;
      }

      current = current.next;
    }

    return null;
  }

  toArray() {
    const array = [];
    let current = this._head;

    while (current) {
      array.push(current);

      current = current.next;
    }

    return array;
  }

  static fromIterable(iterable) {
    if (!isIterable(iterable)) {
      throw new Error('Ошибка: Сущность не является итерируемой!');
    }

    const linkedList = new LinkedList();

    for (let elem of iterable) {
      linkedList.append(elem);
    }

    return linkedList;
  }
}
