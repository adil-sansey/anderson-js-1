'use strict';

class Car {
  constructor() {
    this._currentFuelVolume = 0;
    this._isStarted = false;
    this._mileage = 0;
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

    const date = new Date();
    const currentYear = date.getFullYear();
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

  get currentFuelVolume() {
    return this._currentFuelVolume;
  }

  get isStarted() {
    return this._isStarted;
  }

  get mileage() {
    return this._mileage;
  }

  start() {
    if (this._isStarted) {
      throw new Error('Машина уже заведена');
    }

    this._isStarted = true;
  }

  shutDownEngine() {
    if (!this._isStarted) {
      throw new Error('Машина ещё не заведена');
    }

    this._isStarted = false;
  }

  fillUpGasTank(value) {
    const isZeroOrNegative = value <= 0;

    if (!isValidNumber(value) || isZeroOrNegative) {
      throw new Error('Неверное количество топлива для заправки');
    }

    const isIncorrectAmountOfGas = this._currentFuelVolume + value > this._maxFuelVolume;

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
    const requiredGasAmount = distance / this.fuelConsumption;

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

// brand (строка от 1 до 50 символов включительно)
// - model (строка от 1 до 50 символов включительно)
// - yearOfManufacturing (число от 1900 до текущего года включительно)
// - maxSpeed (число от 100 до 300 км/ч)
// - maxFuelVolume (число в литрах от 5 до 20)
// - fuelConsumption (число в л/100км)
// - currentFuelVolume (число в литрах, по умолчанию 0)
// - isStarted (логический тип, по умолчанию false)
// - mileage (число в километрах, по умолчанию 0)

const car = new Car();

car.brand = 'Toyota';
car.model = 'Toyota Corolla';
car.yearOfManufacturing = 2010;

car.maxSpeed = 200;
car.maxFuelVolume = 20;
car.fuelConsumption = 10;
car.fillUpGasTank(25);

car.start();
car.drive(60, 2);
car.shutDownEngine();

export default Car;
