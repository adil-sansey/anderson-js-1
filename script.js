'use strict';

const value = +prompt('Введите число:');
const base = +prompt('Введите систему счисления (от 2 до 36 включительно):');

function isNumberValid(value) {
  const isInfinity = value === Infinity || value === -Infinity;

  if (isInfinity || isNaN(value)) {
    return false;
  }

  return true;
}

function isBaseValid(value) {
  if (value < 2 || value > 36) {
    return false;
  }

  return true;
}

const isBothNumbersValid = isNumberValid(value) && isNumberValid(base);

if (!isBothNumbersValid || !isBaseValid(base)) {
  console.log('Некорректный ввод!');
} else {
  console.log(value.toString(base));
}
