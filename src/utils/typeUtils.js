export const isArray = array => Object.prototype.toString.call(array) === '[object Array]';

export const isStringArray = array =>
  !(
    !array ||
    !isArray(array) ||
    array.some(actionName => !actionName || typeof actionName !== 'string')
  );

export const isValidObject = obj => !(!obj || obj.constructor !== Object);

export const isObjectArray = array =>
  Array.isArray(array) && array.every((item) => isValidObject(item));
