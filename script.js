'use strict';

function makeObjectDeepCopy(obj) {
  let copy;

  if (Array.isArray(obj)) {
    copy = [];
  } else if (isRegularObject(obj)) {
    copy = {};
  }

  for (let [key, value] of Object.entries(obj)) {
    if (isPrimitiveOrFunc(value)) {
      copy[key] = value;
    } else {
      copy[key] = makeObjectDeepCopy(value);
    }
  }

  return copy;
}

const object = {
  name: 'Adil',
  surname: 'Sansey',
  age: 26,

  null: null,
  sayHello: function () {
    console.log(`Hello, from ${this.surname} ${this.name}`);
  },

  obj: {
    nested: {},
  },

  arr: [{ index: 1 }, { index: 2 }, { index: 3 }],
};

function selectFromInterval(array, start, end) {
  if (!Array.isArray(array)) {
    throw new Error('Ошибка: Некорректный массив!');
  }

  array.forEach((elem) => {
    if (!isValidNumber(elem)) {
      throw new Error('Ошибка: Некорректные значения массива!');
    }
  });

  if (!isValidNumber(start) || !isValidNumber(end)) {
    throw new Error('Ошибка: Некорректное значение интревала!');
  }

  if (start > end) {
    start += end;
    end = start - end;
    start -= end;
  }

  const result = array.filter((elem) => elem >= start && elem <= end);

  return result;
}

const myIterable = { from: 1, to: 4 };

myIterable[Symbol.iterator] = function () {
  function isValidParams(from, to) {
    const isParamsUndefined = from === undefined || to === undefined;
    const isParamsValidNumbers = isValidNumber(from) && isValidNumber(to);

    return !(isParamsUndefined || !isParamsValidNumbers);
  }

  if (!isValidParams(this.from, this.to)) {
    throw new Error(`Ошибка: Объект не является итерируемым!`);
  }

  if (this.to < this.from) {
    throw new Error('Ошибка: to не может быть меньше from!');
  }

  return {
    current: this.from,
    last: this.to,

    next() {
      if (this.current <= this.last) {
        return { done: false, value: this.current++ };
      } else {
        return { done: true };
      }
    },
  };
};

function isPrimitiveOrFunc(value) {
  return value === null || typeof value !== 'object';
}

function isRegularObject(value) {
  const isArray = Array.isArray(value);

  return !(isArray || isPrimitiveOrFunc(value));
}

function isValidNumber(value) {
  const isNumber = typeof value === 'number';

  return isNumber && !isNaN(value) && isFinite(value);
}
