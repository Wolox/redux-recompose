import * as yup from 'yup';
import onLoading from '../../effects/onLoading';
import onSuccess from '../../effects/onSuccess';
import onFailure from '../../effects/onFailure';
import onRetry from '../../effects/onRetry';
import onCancel from '../../effects/onCancel';

const schema = yup.object().required().shape({
  primaryActions: yup.array().of(yup.string().typeError('primaryActions should be an array of strings')).typeError('primaryActions should be an array'),
  pollingActions: yup.array().of(yup.string().typeError('pollingActions should be an array of strings')).typeError('pollingActions should be an array'),
  override: yup.object()
}).typeError('reducerDescription should be an object');

// Given a reducer description, it returns a reducerHandler with all success and failure cases
function completeReducer(reducerDescription) {
  schema.validateSync(reducerDescription);
  const {
    primaryActions = [], pollingActions = [], override = {}
  } = reducerDescription;

  const reducerHandler = {};
  primaryActions.forEach(actionName => {
    reducerHandler[actionName] = onLoading();
    reducerHandler[`${actionName}_SUCCESS`] = onSuccess();
    reducerHandler[`${actionName}_FAILURE`] = onFailure();
  });

  pollingActions.forEach(actionName => {
    reducerHandler[actionName] = onLoading();
    reducerHandler[`${actionName}_SUCCESS`] = onSuccess();
    reducerHandler[`${actionName}_FAILURE`] = onFailure();
    reducerHandler[`${actionName}_RETRY`] = onRetry();
    reducerHandler[`${actionName}_CANCEL`] = onCancel();
  });

  return { ...reducerHandler, ...override };
}

export default completeReducer;
