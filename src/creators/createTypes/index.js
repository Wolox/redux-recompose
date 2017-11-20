import Immutable from 'seamless-immutable';

/**
 * Receives an array of strings, and returns an obj with that strings as properties
   with that string as value.
 * E.G:
 * stringArrayToObject(['A', 'B', 'C']) // { A: 'A', B: 'B', C: 'C' }
 */
function stringArrayToObject(actionsArray, namespace) {
  if (actionsArray.some(actionName => !actionName || typeof actionName !== 'string')) {
    throw new Error('Action names must be an array of strings.');
  }
  return Immutable(actionsArray).asObject(actionName => [
    actionName,
    namespace ? `${namespace}/${actionName}` : actionName
  ]);
}

function createTypes(actionsArray, namespace) {
  if (!namespace) console.warn('No namespace provided while creating action types');
  return stringArrayToObject(actionsArray, namespace);
}

export default createTypes;
