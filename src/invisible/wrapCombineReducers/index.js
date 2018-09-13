import createTypes from '../../creators/createTypes';

import commonReducer, { defaultActionNames } from './commonReducer';

const INVISIBLE_NAMESPACE = '$INVISIBLE';

const getSuperNamespace = actionName => actionName.slice(0, actionName.indexOf(':'));
const shouldBeExtended = action => getSuperNamespace(action.type) === INVISIBLE_NAMESPACE;

const getSliceName = (action, reducerObject) => {
  let sliceName = action.type
    .slice(action.type.indexOf(':') + 1, action.type.indexOf('/'))
    .replace('#', '')
    .toLowerCase();
  Object.keys(reducerObject).forEach(reducerName => {
    if (reducerName.toLowerCase() === sliceName) sliceName = reducerName;
  });
  return sliceName;
};

const formatActionName = actionName => actionName.slice(actionName.indexOf('/') + 1);

function wrapCombineReducers(CR, invisibleReducer = commonReducer) {
  function combineReducers(reducerObject) {
    return (state = {}, action) => {
      if (!shouldBeExtended(action)) return CR(reducerObject)(state, action);
      const slice = getSliceName(action, reducerObject);
      return {
        ...state,
        [slice]: invisibleReducer(
          state[slice],
          { ...action, type: formatActionName(action.type) }
        )
      };
    };
  }
  return combineReducers;
}

export function createExternalActions(reducerName, actionNames = defaultActionNames) {
  return createTypes(actionNames, `${INVISIBLE_NAMESPACE}:#${reducerName.toUpperCase()}`);
}

export default wrapCombineReducers;
