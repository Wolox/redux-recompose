/**
 * Receives an array of strings, and returns an obj with that strings as properties
   with that string as value.
 * E.G:
 * stringArrayToObject(['A', 'B', 'C']) // { A: 'A', B: 'B', C: 'C' }
 */
function stringArrayToObject(actionsArray, namespace) {
  if (!Array.isArray(actionsArray) || actionsArray.some(actionName => !actionName || typeof actionName !== 'string')) {
    throw new Error('Action names must be an array of strings');
  }

  const actionNames = {};

  actionsArray.forEach(actionName => {
    actionNames[actionName] = namespace ? `${namespace}/${actionName}` : actionName;
  });

  return actionNames;
}

function createTypes(actionsArray, namespace) {
  if (!namespace) console.warn('No namespace provided while creating action types');
  return stringArrayToObject(actionsArray, namespace);
}

export default createTypes;
