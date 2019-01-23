import { isStringArray } from '../../utils/typeUtils';

function completeTypes(types, ignoredActions = [], pollingTypes = []) {
  if (!isStringArray(types)) {
    throw new Error('Types must be an array of strings');
  }
  if (!isStringArray(ignoredActions)) {
    throw new Error('Exception cases from actions must be an array of strings');
  }
  if (!isStringArray(pollingTypes)) {
    throw new Error('Polling cases from actions must be an array of strings');
  }

  const completedTypes = [];

  const successFailurePatternTypes = [...types, ...pollingTypes];
  successFailurePatternTypes.forEach(type => {
    completedTypes.push(type);
    completedTypes.push(`${type}_SUCCESS`);
    completedTypes.push(`${type}_FAILURE`);
  });

  pollingTypes.forEach(type => completedTypes.push(`${type}_RETRY`));

  return [...completedTypes, ...ignoredActions];
}

export default completeTypes;
