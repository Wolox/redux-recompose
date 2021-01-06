import * as yup from 'yup';
import onLoading from '../../effects/onLoading';
import onSuccess from '../../effects/onSuccess';
import onFailure from '../../effects/onFailure';

import onSubscribe from '../../effects/onSubscribe';
import onUnsubscribe from '../../effects/onUnsubscribe';

const schema = yup.object().required().shape({
  primaryActions: yup.array().of(yup.string().typeError('primaryActions should be an array of strings')).typeError('primaryActions should be an array'),
  modalActions: yup.array().of(yup.string().typeError('modalActions should be an array of strings')).typeError('modalActions should be an array'),
  override: yup.object()
}).typeError('reducerDescription should be an object');

// Given a reducer description, it returns a reducerHandler with all success and failure cases
function completeReducer(reducerDescription) {
  schema.validateSync(reducerDescription);
  const { primaryActions = [], modalActions = [], override = {} } = reducerDescription;

  const reducerHandler = {};
  primaryActions.forEach(actionName => {
    reducerHandler[actionName] = onLoading();
    reducerHandler[`${actionName}_SUCCESS`] = onSuccess();
    reducerHandler[`${actionName}_FAILURE`] = onFailure();
  });

  modalActions.forEach(actionName => {
    reducerHandler[`${actionName}_OPEN`] = onSubscribe();
    reducerHandler[`${actionName}_CLOSE`] = onUnsubscribe();
  });

  return { ...reducerHandler, ...override };
}

export default completeReducer;
