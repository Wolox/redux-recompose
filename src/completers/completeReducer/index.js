import onLoading from '../../effects/onLoading';
import onSuccess from '../../effects/onSuccess';
import onFailure from '../../effects/onFailure';

// Given a reducer description, it returns a reducerHandler with all success and failure cases
function completeReducer(reducerDescription) {
  if (!reducerDescription || !reducerDescription.primaryActions) {
    throw new Error('Reducer description is incomplete, should contain at least a primaryActions field');
  }
  if (
    !reducerDescription.primaryActions ||
    reducerDescription.primaryActions.constructor !== Array ||
    reducerDescription.primaryActions.some(actionName => !actionName || typeof actionName !== 'string')
  ) {
    throw new Error('Primary actions must be a string array');
  }
  let reducerHandler = {};
  reducerDescription.primaryActions.forEach(actionName => {
    reducerHandler[actionName] = onLoading();
    reducerHandler[`${actionName}_SUCCESS`] = onSuccess();
    reducerHandler[`${actionName}_FAILURE`] = onFailure();
  });

  if (reducerDescription.override) {
    reducerHandler = { ...reducerHandler, ...reducerDescription.override };
  }
  return reducerHandler;
}

export default completeReducer;
