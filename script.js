import { Calculator } from './src/Calculator/Calculator.js';

const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const turnToNegative = document.querySelector('[data-negative]');

const addToBookmarks = document.querySelector('.add-to-bookmarks');
const copyTextButton = document.querySelector('.icon-copy');

const journalButton = document.querySelector('.icon-journal');
const journal = document.querySelector('.journal-container');
const journalList = document.querySelector('.journal-list');

const memoryValue = document.querySelector('.memory-value');
const memoryClearButton = document.querySelector('.mc');
const memoryRButton = document.querySelector('.mr');
const memoryPlusButton = document.querySelector('.m-plus');
const memoryMinusButton = document.querySelector('.m-minus');

const calculator = new Calculator({
  previousOperandTextElement,
  currentOperandTextElement,
  memoryValue,
  journalList,
});

numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.dataset.number);
  });
});

operationButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.dataset.operation);
  });
});

allClearButton.addEventListener('click', () => {
  calculator.clear();
});

deleteButton.addEventListener('click', () => {
  calculator.delete();
});

equalsButton.addEventListener('click', () => {
  calculator.compute();
});

turnToNegative.addEventListener('click', () => {
  calculator.turnToNegative();
});

addToBookmarks.addEventListener('click', () => {
  alert('Чтобы добавить в закладки нажмите Ctrl + D');
});

journalButton.addEventListener('click', () => {
  journal.classList.toggle('hidden');
});

copyTextButton.addEventListener('click', () => {
  calculator.copyToClipboard();
});

memoryValue.addEventListener('click', () => {
  calculator.switchMemory();
});

memoryClearButton.addEventListener('click', () => {
  calculator.clearMemory();
});

memoryRButton.addEventListener('click', () => {
  calculator.memoryR();
});

memoryPlusButton.addEventListener('click', () => {
  calculator.memoryPlus();
});

memoryMinusButton.addEventListener('click', () => {
  calculator.memoryMinus();
});
