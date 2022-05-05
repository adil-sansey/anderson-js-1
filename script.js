'use strict';

const VALUE = +prompt('Введите число:');
const BASE = +prompt('Введите систему счисления (от 2 до 36 включительно):');

function isNumberValid(value) {
  return !(isNaN(value) || !isFinite(value));
}

function isBaseValid(value) {
  return value >= 2 && value <= 36;
}

const isBothNumbersValid = isNumberValid(VALUE) && isNumberValid(BASE);

if (!isBothNumbersValid || !isBaseValid(BASE)) {
  console.log('Некорректный ввод!');
} else {
  console.log(VALUE.toString(BASE));
}
