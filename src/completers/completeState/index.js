import { isStringArray, isValidObject, isObjectArray } from '../../utils/typeUtils';

const isValidCustomCompleter = (targets, completers) =>
  isStringArray(targets) && isValidObject(completers);

export const customCompleter = (target, completers = {}) =>
  Object.keys(completers)
    .map(completer => ({ [`${target}${completer}`]: completers[completer] }))
    .reduce((acc, value) => ({ ...acc, ...value }), {});

function completeState({ description, targetCompleters = [], ignoredTargets = [] }) {
  if (!isValidObject(description)) {
    throw new Error('Expected an object as a description');
  }
  if (!isStringArray(ignoredTargets)) {
    throw new Error('Expected an array of strings as ignored targets');
  }
  if (!isObjectArray(targetCompleters)) {
    throw new Error('Expected an array of objects as a target completers');
  }

  const primaryState = Object.keys(description)
    .filter(key => ignoredTargets.indexOf(key) === -1)
    .reduce((acc, key) => ({
      ...acc,
      [`${key}Loading`]: false,
      [`${key}Error`]: null
    }), {});

  const customCompleters = targetCompleters
    .map(({ completers, targets }) => {
      if (!isValidCustomCompleter(targets, completers)) {
        throw new Error('Expected an objects with targets as string array and completers as valid object');
      }
      return targets
        .map(target => customCompleter(target, completers))
        .reduce((acc, value) => ({ ...acc, ...value }), {});
    })
    .reduce((acc, value) => ({ ...acc, ...value }), {});

  return { ...description, ...primaryState, ...customCompleters };
}

export default completeState;
