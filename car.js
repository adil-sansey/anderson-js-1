'use strict';

export class Car {
  constructor() {
    this._currentFuelVolume = 0;
    this._isStarted = false;
    this._mileage = 0;
  }

  get currentFuelVolume() {
    return this._currentFuelVolume;
  }

  get isStarted() {
    return this._isStarted;
  }

  get mileage() {
    return this._mileage;
  }

  get brand() {
    return this._brand;
  }

  set brand(value) {
    if (!isString(value)) {
      throw new Error('Ошибка: Брэнд должен быть строкой!');
    }

    const isValidLength = value.length >= 1 && value.length <= 50;

    if (!isValidLength) {
      throw new Error('Ошибка: Имя брэнда должно быть от 1 до 50 символов включительно!');
    }

    this._brand = value;
  }

  get model() {
    return this._model;
  }

  set model(value) {
    if (!isString(value)) {
      throw new Error('Ошибка: Модель должна быть строкой!');
    }

    const isValidLength = value.length >= 1 && value.length <= 50;

    if (!isValidLength) {
      throw new Error('Ошибка: Модель должна быть от 1 до 50 символов включительно!');
    }

    this._model = value;
  }

  get yearOfManufacturing() {
    return this._yearOfManufacturing;
  }

  set yearOfManufacturing(value) {
    if (!isValidNumber(value)) {
      throw new Error('Ошибка: параметр не является числом!');
    }

    const currentYear = new Date().getFullYear();
    const isInRange = value >= 1900 && value <= currentYear;

    if (!isInRange) {
      throw new Error(
        'Ошибка: Год выпуска должен быть в диапозоне от 1900 до текущего года включительно!'
      );
    }

    this._yearOfManufacturing = value;
  }

  get maxSpeed() {
    return this._maxSpeed;
  }

  set maxSpeed(value) {
    if (!isValidNumber(value)) {
      throw new Error('Ошибка: параметр не является числом!');
    }

    const isInRange = value >= 100 && value <= 300;

    if (!isInRange) {
      throw new Error(
        'Ошибка: Максимальная скорость должна быть в диапозоне от 100 до 300 км/ч включительно!'
      );
    }

    this._maxSpeed = value;
  }

  get maxFuelVolume() {
    return this._maxFuelVolume;
  }

  set maxFuelVolume(value) {
    if (!isValidNumber(value)) {
      throw new Error('Ошибка: параметр не является числом!');
    }

    const isInRange = value >= 5 && value <= 20;

    if (!isInRange) {
      throw new Error(
        'Ошибка: Максимальный объем бака должен быть в диапозоне от 5 до 20 литров включительно!'
      );
    }

    this._maxFuelVolume = value;
  }

  get fuelConsumption() {
    return this._fuelConsumption;
  }

  set fuelConsumption(value) {
    if (!isValidNumber(value)) {
      throw new Error('Ошибка: параметр не является числом!');
    }

    this._fuelConsumption = value;
  }

  start() {
    if (this.isStarted) {
      throw new Error('Машина уже заведена');
    }

    this._isStarted = true;
  }

  shutDownEngine() {
    if (!this.isStarted) {
      throw new Error('Машина ещё не заведена');
    }

    this._isStarted = false;
  }

  fillUpGasTank(value) {
    const isZeroOrNegative = value <= 0;

    if (!isValidNumber(value) || isZeroOrNegative) {
      throw new Error('Неверное количество топлива для заправки');
    }

    const isIncorrectAmountOfGas = this.currentFuelVolume + value > this.maxFuelVolume;

    if (isIncorrectAmountOfGas) {
      throw new Error('Топливный бак переполнен');
    }

    this._currentFuelVolume += value;
  }

  drive(speed, hours) {
    const isZeroOrNegativeSpeed = speed <= 0;
    const isZeroOrNegativeHours = hours <= 0;

    if (!isValidNumber(speed) || isZeroOrNegativeSpeed) {
      throw new Error('Неверная скорость');
    }

    if (!isValidNumber(hours) || isZeroOrNegativeHours) {
      throw new Error('Неверное количество часов');
    }

    if (speed > this.maxSpeed) {
      throw new Error('Машина не может ехать так быстро');
    }

    if (!this._isStarted) {
      throw new Error('Машина должна быть заведена, чтобы ехать');
    }

    const distance = speed * hours;
    const requiredGasAmount = (distance / 100) * this.fuelConsumption;

    if (requiredGasAmount > this.currentFuelVolume) {
      throw new Error('Недостаточно топлива');
    }

    this._currentFuelVolume -= requiredGasAmount;
    this._mileage += distance;
  }
}

function isString(value) {
  return typeof value === 'string';
}

function isValidNumber(value) {
  const isNumber = typeof value === 'number';

  return isNumber && isFinite(value);
}
