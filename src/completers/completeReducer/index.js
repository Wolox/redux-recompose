import onLoading from '../../effects/onLoading';
import onSuccess from '../../effects/onSuccess';
import onFailure from '../../effects/onFailure';

import onSubscribe from '../../effects/onSubscribe';
import onUnsubscribe from '../../effects/onUnsubscribe';

import onRetry from '../../effects/onRetry';

import { isStringArray, isValidObject } from '../../utils/typeUtils';

const PRIMARY_ACTIONS = 'primaryActions';
const MODAL_ACTIONS = 'modalActions';
const POLLING_ACTIONS = 'pollingActions';
const OVERRIDE_ACTIONS = 'override';

function validateReducerDescription(reducerDescription) {
  if (
    !reducerDescription ||
    ![PRIMARY_ACTIONS, MODAL_ACTIONS, POLLING_ACTIONS].some(actionsField => reducerDescription[actionsField] && reducerDescription[actionsField].length)
  ) {
    throw new Error('Reducer description is incomplete, should contain at least an actions field to complete');
  }
}

function completeReducerHandler(reducerDescription, actionsKey, completeHandlerFunction) {
  const actionsArray = reducerDescription[actionsKey];
  if (actionsArray) {
    if (!isStringArray(actionsArray)) {
      throw new Error(`${actionsKey} must be a string array`);
    }
    actionsArray.forEach(completeHandlerFunction);
  }
}

// Given a reducer description, it returns a reducerHandler with all success and failure cases
function completeReducer(reducerDescription) {
  validateReducerDescription(reducerDescription);

  let reducerHandler = {};

  completeReducerHandler(reducerDescription, PRIMARY_ACTIONS, actionName => {
    reducerHandler[actionName] = onLoading();
    reducerHandler[`${actionName}_SUCCESS`] = onSuccess();
    reducerHandler[`${actionName}_FAILURE`] = onFailure();
  });

  completeReducerHandler(reducerDescription, MODAL_ACTIONS, actionName => {
    reducerHandler[`${actionName}_OPEN`] = onSubscribe();
    reducerHandler[`${actionName}_CLOSE`] = onUnsubscribe();
  });

  completeReducerHandler(reducerDescription, POLLING_ACTIONS, actionName => {
    reducerHandler[actionName] = onLoading();
    reducerHandler[`${actionName}_SUCCESS`] = onSuccess();
    reducerHandler[`${actionName}_FAILURE`] = onFailure();
    reducerHandler[`${actionName}_RETRY`] = onRetry();
  });

  if (reducerDescription[OVERRIDE_ACTIONS]) {
    if (!isValidObject(reducerDescription[OVERRIDE_ACTIONS])) {
      throw new Error('Reducer description containing a override is not an object');
    }
    reducerHandler = { ...reducerHandler, ...reducerDescription[OVERRIDE_ACTIONS] };
  }
  return reducerHandler;
}

export default completeReducer;
