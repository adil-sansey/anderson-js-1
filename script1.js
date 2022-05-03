'use strict';

function isValidNumber(value) {
  if (value === Infinity || value === -Infinity || isNaN(value)) {
    return false;
  }

  return true;
}

function runHomework2() {
  const leftOperand = +prompt('Введите число:');

  if (!isValidNumber(leftOperand)) {
    console.log('Некорректный ввод!');
    return;
  }

  const rightOperand = +prompt('Введите число:');

  if (!isValidNumber(rightOperand)) {
    console.log('Некорректный ввод!');
    return;
  }

  const sum = leftOperand + rightOperand;
  const quotient = leftOperand / rightOperand;

  console.log(`Ответ: ${sum}, ${quotient}`);
}

runHomework2();
