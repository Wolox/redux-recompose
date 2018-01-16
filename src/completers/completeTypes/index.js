import { isStringArray } from '../../utils/typeUtils';

function completeTypes(types, ignoredActions = []) {
  if (!isStringArray(types)) {
    throw new Error('Types must be an array of strings');
  }
  if (!isStringArray(ignoredActions)) {
    throw new Error('Exception cases from actions must be an array of strings');
  }

  const completedTypes = [];
  types.forEach(type => {
    completedTypes.push(type);
    completedTypes.push(`${type}_SUCCESS`);
    completedTypes.push(`${type}_FAILURE`);
  });

  return [...completedTypes, ...ignoredActions];
}

export default completeTypes;
