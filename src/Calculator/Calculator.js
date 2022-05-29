import { journalNode } from './journalNode.js';
import { sum } from '../helpers/sum.js';
import { quotient } from '../helpers/quotient.js';
import { mul } from '../helpers/mul.js';
import { difference } from '../helpers/difference.js';

export class Calculator {
  constructor(params) {
    Object.assign(this, params);

    this.isComputed = false;
    this.journal = [];
    this.memory = {
      currentValueNumber: 1,
      current: 'value1',
      value1: 0,
      value2: 0,
      value3: 0,
    };

    this.clear();
  }

  clear() {
    this.previousOperand = '';
    this.currentOperand = '';
    this.operation = undefined;
    this.isComputed = false;

    this.updateDisplay();
  }

  delete() {
    this.currentOperand = this.currentOperand.slice(0, -1);

    this.updateDisplay();
  }

  appendNumber(number) {
    if (this.isComputed) {
      this.currentOperand = '';
      this.isComputed = false;

      if (number === '.' && this.currentOperand.includes('.')) {
        return;
      }

      this.currentOperand = this.currentOperand.toString() + number.toString();
    } else {
      if (number === '.' && this.currentOperand.includes('.')) {
        return;
      }

      this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    this.updateDisplay();
  }

  chooseOperation(operation) {
    if (this.currentOperand === '' && this.previousOperand !== '') {
      this.operation = operation;
      this.updateDisplay();

      return;
    }

    if (this.currentOperand === '' && this.previousOperand === '') {
      return;
    }

    if (this.currentOperand !== '' && this.previousOperand !== '') {
      this.compute();
    }

    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';

    this.updateDisplay();
  }

  turnToNegative() {
    if (this.currentOperand === '') {
      return;
    }

    const isNegative = this.currentOperand[0] === '-';

    if (isNegative) {
      this.currentOperand = this.currentOperand.slice(1);
      this.updateDisplay();
      return;
    }

    this.currentOperand = '-' + this.currentOperand;

    this.updateDisplay();
  }

  compute() {
    let result;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);

    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case '+':
        result = sum(prev, current);
        break;
      case '-':
        result = quotient(prev, current);
        break;
      case '*':
        result = mul(prev, current);
        break;
      case '÷':
        result = difference(prev, current);
        break;
      default:
        return;
    }

    const operation = `${prev} ${this.operation} ${current} =`;
    const newJournalItem = new journalNode(operation, result);

    this.journal.push(newJournalItem);
    this.addToJournal(newJournalItem);

    this.currentOperand = result.toString();
    this.previousOperand = '';
    this.operation = undefined;
    this.isComputed = true;

    this.updateDisplay();
  }

  addToJournal(node) {
    const li = document.createElement('li');

    li.innerText = `${node.operation}\n${node.result}`;
    this.journalList.prepend(li);
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];

    let integerDisplay;

    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
    }

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);

    if (this.operation) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${
        this.operation
      }`;
    } else {
      this.previousOperandTextElement.innerText = this.previousOperand;
    }

    this.memoryValue.innerText = `M${this.memory.currentValueNumber}: ${
      this.memory[this.memory.current]
    }`;
  }

  copyToClipboard() {
    const text = this.currentOperand;

    if (!text) {
      return;
    }

    navigator.clipboard.writeText(text);
    alert('Скопированно в буфер обмена!');
  }

  switchMemory() {
    switch (this.memory.current) {
      case 'value1':
        this.memory.currentValueNumber = 2;
        this.memory.current = 'value2';

        this.updateDisplay();
        break;
      case 'value2':
        this.memory.currentValueNumber = 3;
        this.memory.current = 'value3';

        this.updateDisplay();
        break;
      case 'value3':
        this.memory.currentValueNumber = 1;
        this.memory.current = 'value1';

        this.updateDisplay();
        break;
      default:
        return;
    }
  }

  clearMemory() {
    this.memory.value1 = 0;
    this.memory.value2 = 0;
    this.memory.value3 = 0;

    this.updateDisplay();
  }

  memoryR() {
    this.currentOperand = this.memory[this.memory.current];

    this.updateDisplay();
  }

  memoryPlus() {
    const memoryValue = this.memory[this.memory.current];
    const currentOperand = parseFloat(this.currentOperand);

    if (isNaN(memoryValue) || isNaN(currentOperand)) {
      return;
    }

    this.memory[this.memory.current] = sum(memoryValue, currentOperand);

    this.updateDisplay();
  }

  memoryMinus() {
    const memoryValue = this.memory[this.memory.current];
    const currentOperand = parseFloat(this.currentOperand);

    if (isNaN(memoryValue) || isNaN(currentOperand)) {
      return;
    }

    this.memory[this.memory.current] = quotient(memoryValue, currentOperand);

    this.updateDisplay();
  }
}
