'use strict';

Array.prototype.myFilter = function (callback, thisArg = undefined) {
  const result = [];

  for (let index = 0; index < this.length; index++) {
    const elem = this[index];
    const callbackResult = callback.call(thisArg, elem, index, this);

    if (callbackResult) {
      result.push(elem);
    }
  }

  return result;
};

function createDebounceFunction(callback, delay) {
  let timerId;
  let start;

  return function () {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(callback, delay, start);
    if (start === undefined) {
      start = Date.now();
    }
    console.log(timerId);
  };
}
