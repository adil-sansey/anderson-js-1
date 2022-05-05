'use strict';

function isNumberValid(value) {
  const isInfinity = value === Infinity || value === -Infinity;

  if (isInfinity || isNaN(value)) {
    return false;
  }

  return true;
}

function runHomework2() {
  const leftOperand = +prompt('Введите число:');

  if (!isNumberValid(leftOperand)) {
    console.log('Некорректный ввод!');
    return;
  }

  const rightOperand = +prompt('Введите число:');

  if (!isNumberValid(rightOperand)) {
    console.log('Некорректный ввод!');
    return;
  }

  const sum = leftOperand + rightOperand;
  const quotient = leftOperand / rightOperand;

  console.log(`Ответ: ${sum}, ${quotient}`);
}

runHomework2();
