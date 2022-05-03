'use strict';

const value = +prompt('Введите число:');
const base = +prompt('Введите систему счисления (от 2 до 36 включительно):');

function isNumberValid(value) {
  if (value === Infinity || value === -Infinity || isNaN(value)) {
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

if (!isNumberValid(value) || !isNumberValid(base) || !isBaseValid(base)) {
  console.log('Некорректный ввод!');
} else {
  console.log(value.toString(base));
}
