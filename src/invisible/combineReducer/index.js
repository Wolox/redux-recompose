import { mergeState } from '../../configuration';

const getSuperNamespace = actionName => actionName.slice(0, actionName.indexOf(':'));
const shouldBeExtended = action => getSuperNamespace(action.type) === '$INVISIBLE';

const getSliceName = (action, reducerObject) => {
  let sliceName = action.type
    .slice(action.type.indexOf(':') + 1, action.type.indexOf('/'))
    .replace('@', '')
    .toLowerCase();
  Object.keys(reducerObject).forEach(reducerName => {
    if (reducerName.toLowerCase() === sliceName) sliceName = reducerName;
  });
  return sliceName;
};

const formatActionName = actionName => actionName.slice(actionName.indexOf('/') + 1);

function onLoading() {
  return (state, action) => ({ ...state, [`${action.target}Loading`]: true });
}

function onSuccess() {
  return (state, action) => ({
    ...state,
    [`${action.target}Loading`]: false,
    [`${action.target}`]: 'success'
  });
}

const commonReducer = (state = {}, action) => {
  switch (formatActionName(action.type)) {
    case 'LOADING':
      return onLoading()(state, action);
    case 'SUCCESS':
      return onSuccess()(state, action);
    default:
      return state;
  }
};

export function wrapCombineReducers(CR, invisibleReducer = commonReducer) {
  function combineReducers(reducerObject) {
    return (state = {}, action) => {
      if (!shouldBeExtended(action)) return CR(reducerObject)(state, action);
      const slice = getSliceName(action, reducerObject);
      return mergeState(state, { [slice]: invisibleReducer(state[slice], action) });
    };
  }
  return combineReducers;
}

export function createExternalActions(reducerName) {
  return {
    LOADING: `$INVISIBLE:@${reducerName.toUpperCase()}/LOADING`,
    SUCCESS: `$INVISIBLE:@${reducerName.toUpperCase()}/SUCCESS`
  };
}
