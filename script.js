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
      const result = strings.join(separator);

      return result;
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

    this._leftOperand = leftOperand;
    this._rightOperand = rightOperand;
  }

  setX = (value) => {
    if (!isValidNumber(value)) {
      throw new Error('Ошибка: Параметр не является валидным числом!');
    }

    this._leftOperand = value;
  };

  setY = (value) => {
    if (!isValidNumber(value)) {
      throw new Error('Ошибка: Параметр не является валидным числом!');
    }

    this._rightOperand = value;
  };

  logSum = () => {
    console.log(sum);
  };

  logMul = () => {
    console.log(this._leftOperand * this._rightOperand);
  };

  logSub = () => {
    console.log(this._leftOperand - this._rightOperand);
  };

  logDiv = () => {
    if (this._rightOperand === 0) {
      throw new Error('Ошибка: Нельзя делить на ноль!');
    }

    console.log(this._leftOperand / this._rightOperand);
  };
}

function isValidString(value) {
  return typeof value === 'string';
}

function isValidNumber(value) {
  const isNumber = typeof value === 'number';

  return isNumber && isFinite(value);
}
