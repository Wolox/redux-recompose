export const isStringArray = array => !(
  !array ||
  array.constructor !== Array ||
  array.some(actionName => !actionName || typeof actionName !== 'string')
);

export const isValidObject = obj => !(
  !obj || obj.constructor !== Object
);
