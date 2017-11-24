const isStringArray = array => !(
  !array ||
  array.constructor !== Array ||
  array.some(actionName => !actionName || typeof actionName !== 'string')
);

export default isStringArray;
