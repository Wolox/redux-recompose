import { isStringArray, isValidObject, isObjectArray } from '../../utils/typeUtils';

const isValidCustomCompleter = (targets, completer) =>
  isStringArray(targets) && typeof completer === 'function';

function completeState({ description, targetCompleters = [], ignoredTargets = {} }) {
  if (!isValidObject(description)) {
    throw new Error('Expected an object as a description');
  }
  if (ignoredTargets && !isValidObject(ignoredTargets)) {
    throw new Error('Expected an objects as ignored targets');
  }
  if (!isObjectArray(targetCompleters)) {
    throw new Error('Expected an array of objects as a target completers');
  }

  const primaryState = Object.keys(description)
    .reduce((acc, key) => ({
      ...acc,
      [key]: description[key],
      [`${key}Loading`]: false,
      [`${key}Error`]: null
    }), {});

  const customCompleters = targetCompleters
    .map(({ completer, targets }) => {
      if (!isValidCustomCompleter(targets, completer)) {
        throw new Error('Expected an object with targets as string array and completer as valid function');
      }
      return targets
        .map(completer)
        .reduce((acc, value) => ({ ...acc, ...value }), {});
    })
    .reduce((acc, value) => ({ ...acc, ...value }), {});

  return { ...primaryState, ...customCompleters, ...ignoredTargets };
}

export default completeState;
