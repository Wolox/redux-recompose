import baseThunkAction from '../injections/baseThunkAction';
import emptyThunkAction from '../injections/emptyThunkAction';
import composeInjections from '../injections/composeInjections';
import mergeInjections from '../injections/mergeInjections';

const ensembleInjections = action => {
  const base = action.target ? baseThunkAction(action) : emptyThunkAction(action);
  if (!action.injections) return base;

  const injections = action.injections.constructor === Array
    ? mergeInjections(action.injections) : action.injections;

  return { ...base, ...injections };
};

const fetchMiddleware = ({ dispatch }) => next => action => (
  action.service ?
    dispatch(composeInjections(ensembleInjections(action))) :
    next(action)
);

export default fetchMiddleware;
