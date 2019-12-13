import externalBaseAction from '../injections/externalBaseAction';
import baseThunkAction from '../injections/baseThunkAction';
import emptyThunkAction from '../injections/emptyThunkAction';
import singleCallThunkAction from '../injections/singleCallThunkAction';
import composeInjections from '../injections/composeInjections';
import mergeInjections from '../injections/mergeInjections';

const ensembleInjections = action => {
  let base;
  if (action.external) {
    base = externalBaseAction(action);
  } else if (!action.type) {
    base = singleCallThunkAction(action);
  } else {
    base = action.target ? baseThunkAction(action) : emptyThunkAction(action);
  }
  if (!action.injections) return base;
  const injections = action.injections.constructor === Array
    ? mergeInjections(action.injections) : action.injections;

  return { ...base, ...injections };
};

const shouldExecuteAction = (currentEnv, scopes) =>
  Array.isArray(scopes) &&
  scopes.some(scope => Object.entries(scope).every(([key, value]) => currentEnv[key] === value));

const scopeMiddleware = (currentEnv, action, dispatch) =>
  (action.scopes
    ? shouldExecuteAction(currentEnv, action.scopes)
    && dispatch(composeInjections(ensembleInjections(action)))
    : dispatch(composeInjections(ensembleInjections(action))));

const fetchMiddleware = currentEnv => dispatch => next => action => (
  action.service ?
    scopeMiddleware(currentEnv, action, dispatch) :
    next(action)
);

export default fetchMiddleware;
