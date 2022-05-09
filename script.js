'use strict';

function concatStrings(str, separator) {
  if (!isValidString(str)) {
    str = '';
  }

  if (!isValidString(separator)) {
    separator = '';
  }

  const strings = [str];

  return function curry(str) {
    if (!isValidString(str)) {
      return strings.join(separator);
    } else {
      strings.push(str);

      return curry;
    }
  };
}

class Calculator {
  constructor(...args) {
    if (args.length !== 2) {
      throw new Error('Ошибка: Необходимо два параметра!');
    }

    const [leftOperand, rightOperand] = args;

    if (!isValidNumber(leftOperand) || !isValidNumber(rightOperand)) {
      throw new Error('Ошибка: Параметры не являются валидными числами!');
    }

    Calculator._leftOperand = leftOperand;
    Calculator._rightOperand = rightOperand;
  }

  setX(value) {
    if (!isValidNumber(value)) {
      throw new Error('Ошибка: Параметр не является валидным числом!');
    }

    Calculator._leftOperand = value;
  }

  setY(value) {
    if (!isValidNumber(value)) {
      throw new Error('Ошибка: Параметр не является валидным числом!');
    }

    Calculator._rightOperand = value;
  }

  logSum() {
    console.log(Calculator._leftOperand + Calculator._rightOperand);
  }

  logMul() {
    console.log(Calculator._leftOperand * Calculator._rightOperand);
  }

  logSub() {
    console.log(Calculator._leftOperand - Calculator._rightOperand);
  }

  logDiv() {
    if (Calculator._rightOperand === 0) {
      throw new Error('Ошибка: Нельзя делить на ноль!');
    }

    console.log(Calculator._leftOperand / Calculator._rightOperand);
  }
}

function isValidString(value) {
  return typeof value === 'string';
}

function isValidNumber(value) {
  const isNumber = typeof value === 'number';

  return isNumber && isFinite(value);
}
