import { isStringArray, isValidObject, isObjectArray } from '../../utils/typeUtils';

const isValidCustomCompleter = (targets, completers) =>
  isStringArray(targets) && isValidObject(completers);

export const customCompleter = (target, completers = {}) =>
  Object.keys(completers)
    .map(completer => ({ [`${target}${completer}`]: completers[completer] }))
    .reduce((acc, value) => ({ ...acc, ...value }), {});

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
    .map(({ completers, targets }) => {
      if (!isValidCustomCompleter(targets, completers)) {
        throw new Error('Expected an objects with targets as string array and completers as valid object');
      }
      return targets
        .map(target => customCompleter(target, completers))
        .reduce((acc, value) => ({ ...acc, ...value }), {});
    })
    .reduce((acc, value) => ({ ...acc, ...value }), {});

  return { ...primaryState, ...customCompleters };
}

export default completeState;
