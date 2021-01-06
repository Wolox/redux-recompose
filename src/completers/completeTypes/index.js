import { isStringArray } from '../../utils/typeUtils';

const primaryActionsCompleter = primaryActions => primaryActions.reduce(
  (completedTypes, type) => [...completedTypes, type, `${type}_SUCCESS`, `${type}_FAILURE`],
  []
);

function completeTypes({ primaryActions = [], ignoredActions = [], customCompleters = [] }) {
  if (!isStringArray(primaryActions)) {
    throw new Error('Primary actions must be an array of strings');
  }
  if (!isStringArray(ignoredActions)) {
    throw new Error('Ignored actions must be an array of strings');
  }
  customCompleters.forEach(({ actions, completer }) => {
    if (!isStringArray(actions)) throw new Error('Exception cases from actions must be an array of strings');
    if (typeof completer !== 'function') throw new Error('Completer must be a function');
  });
  const primaryTypes = primaryActionsCompleter(primaryActions);
  const customCompletedTypes = customCompleters.flatMap(({ actions, completer }) => actions.flatMap(action => completer(action)));
  return [...primaryTypes, ...ignoredActions, ...customCompletedTypes];
}

export default completeTypes;
