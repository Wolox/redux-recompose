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
  const injections = mergeInjections(action.injections);

  return { ...base, ...injections };
};

const fetchMiddleware = ({ dispatch }) => next => action =>
  (action.service ? dispatch(composeInjections(ensembleInjections(action))) : next(action));

export default fetchMiddleware;
