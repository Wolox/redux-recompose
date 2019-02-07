import onLoading from '../../effects/onLoading';
import onSuccess from '../../effects/onSuccess';
import onFailure from '../../effects/onFailure';

import onSubscribe from '../../effects/onSubscribe';
import onUnsubscribe from '../../effects/onUnsubscribe';

import onRetry from '../../effects/onRetry';

import { isStringArray, isValidObject } from '../../utils/typeUtils';

// Given a reducer description, it returns a reducerHandler with all success and failure cases
function completeReducer(reducerDescription) {
  if (
    !reducerDescription ||
    ((!reducerDescription.primaryActions || !reducerDescription.primaryActions.length) &&
      (!reducerDescription.modalActions || !reducerDescription.modalActions.length) &&
      (!reducerDescription.pollingActions || !reducerDescription.pollingActions.length))
  ) {
    throw new Error('Reducer description is incomplete, should contain at least an actions field to complete');
  }

  let reducerHandler = {};

  if (reducerDescription.primaryActions) {
    if (!isStringArray(reducerDescription.primaryActions)) {
      throw new Error('Primary actions must be a string array');
    }
    reducerDescription.primaryActions.forEach(actionName => {
      reducerHandler[actionName] = onLoading();
      reducerHandler[`${actionName}_SUCCESS`] = onSuccess();
      reducerHandler[`${actionName}_FAILURE`] = onFailure();
    });
  }

  if (reducerDescription.modalActions) {
    if (!isStringArray(reducerDescription.modalActions)) {
      throw new Error('Modal actions must be a string array');
    }
    reducerDescription.modalActions.forEach(actionName => {
      reducerHandler[`${actionName}_OPEN`] = onSubscribe();
      reducerHandler[`${actionName}_CLOSE`] = onUnsubscribe();
    });
  }

  if (reducerDescription.pollingActions) {
    if (!isStringArray(reducerDescription.pollingActions)) {
      throw new Error('Polling actions must be a string array');
    }
    reducerDescription.pollingActions.forEach(actionName => {
      reducerHandler[actionName] = onLoading();
      reducerHandler[`${actionName}_SUCCESS`] = onSuccess();
      reducerHandler[`${actionName}_FAILURE`] = onFailure();
      reducerHandler[`${actionName}_RETRY`] = onRetry();
    });
  }

  if (reducerDescription.override) {
    if (!isValidObject(reducerDescription.override)) {
      throw new Error('Reducer description containing a override is not an object');
    }
    reducerHandler = { ...reducerHandler, ...reducerDescription.override };
  }
  return reducerHandler;
}

export default completeReducer;
