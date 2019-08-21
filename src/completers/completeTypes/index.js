import { isStringArray } from '../../utils/typeUtils';

const primaryActionsCompleter = primaryActions =>
  primaryActions.reduce(
    (completedTypes, type) => [...completedTypes, type, `${type}_SUCCESS`, `${type}_FAILURE`],
    []
  );

const ignoresActionsCompleter = ignoredActions => ignoredActions || [];

function completeTypes({ primaryActions, ignoredActions = [], customCompleters = [] }) {
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
  const ignoredTypes = ignoresActionsCompleter(ignoredActions);
  const customCompletedTypes = customCompleters.reduce(
    (customTypes, { actions, completer }) => completer(actions),
    []
  );

  return [...primaryTypes, ...ignoredTypes, ...customCompletedTypes];
}

export default completeTypes;
