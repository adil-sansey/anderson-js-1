'use strict';

class Car {
  #prop = 10;
  #currentFuelVolume = 0;
  #isStarted = false;
  #mileage = 0;
  #brand;
  #model;
  #yearOfManufacturing;
  #maxSpeed;
  #maxFuelVolume;
  #fuelConsumption;

  get currentFuelVolume() {
    return this.#currentFuelVolume;
  }

  get isStarted() {
    return this.#isStarted;
  }

  get mileage() {
    return this.#mileage;
  }

  get brand() {
    return this.#brand;
  }

  set brand(value) {
    if (!isString(value)) {
      throw new Error('Ошибка: Брэнд должен быть строкой!');
    }

    const isValidLength = value.length >= 1 && value.length <= 50;

    if (!isValidLength) {
      throw new Error('Ошибка: Имя брэнда должно быть от 1 до 50 символов включительно!');
    }

    this.#brand = value;
  }

  get model() {
    return this.#model;
  }

  set model(value) {
    if (!isString(value)) {
      throw new Error('Ошибка: Модель должна быть строкой!');
    }

    const isValidLength = value.length >= 1 && value.length <= 50;

    if (!isValidLength) {
      throw new Error('Ошибка: Модель должна быть от 1 до 50 символов включительно!');
    }

    this.#model = value;
  }

  get yearOfManufacturing() {
    return this.#yearOfManufacturing;
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

    this.#yearOfManufacturing = value;
  }

  get maxSpeed() {
    return this.#maxSpeed;
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

    this.#maxSpeed = value;
  }

  get maxFuelVolume() {
    return this.#maxFuelVolume;
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

    this.#maxFuelVolume = value;
  }

  get fuelConsumption() {
    return this.#fuelConsumption;
  }

  set fuelConsumption(value) {
    if (!isValidNumber(value)) {
      throw new Error('Ошибка: параметр не является числом!');
    }

    this.#fuelConsumption = value;
  }

  start() {
    if (this.isStarted) {
      throw new Error('Машина уже заведена');
    }

    this.#isStarted = true;
  }

  shutDownEngine() {
    if (!this.isStarted) {
      throw new Error('Машина ещё не заведена');
    }

    this.#isStarted = false;
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

    this.#currentFuelVolume += value;
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

    if (!this.#isStarted) {
      throw new Error('Машина должна быть заведена, чтобы ехать');
    }

    const distance = speed * hours;
    const requiredGasAmount = (distance / 100) * this.fuelConsumption;

    if (requiredGasAmount > this.currentFuelVolume) {
      throw new Error('Недостаточно топлива');
    }

    this.#currentFuelVolume -= requiredGasAmount;
    this.#mileage += distance;
  }
}

function isString(value) {
  return typeof value === 'string';
}

function isValidNumber(value) {
  const isNumber = typeof value === 'number';

  return isNumber && isFinite(value);
}
