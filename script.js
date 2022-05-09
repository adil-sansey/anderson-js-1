'use strict';

Array.prototype.myFilter = function (callback, thisArg) {
  const result = [];

  this.forEach((elem, index, array) => {
    const callbackResult = callback.call(thisArg, elem, index, array);

    if (callbackResult) {
      result.push(elem);
    }
  });

  return result;
};

function createDebounceFunction(callback, delay) {
  let timerId;

  return function () {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(callback, delay);
  };
}
