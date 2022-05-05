'use strict';

function isValidNumber(value) {
  const isNumber = typeof value === 'number';

  return isNumber && !isNaN(value) && isFinite(value);
}

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

const myIterable = { from: 1, to: 5 };

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
    throw new Error('Ошибка: from не может быть меньше to!');
  }

  return {
    current: this.from,
    last: this.to,

    next: function () {
      if (this.current <= this.last) {
        return { done: false, value: this.current++ };
      } else {
        return { done: true };
      }
    },
  };
};
