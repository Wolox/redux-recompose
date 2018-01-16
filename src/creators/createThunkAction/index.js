import composeInjections from '../../injections/composeInjections';
import baseThunkAction from '../../injections/baseThunkAction';

function createThunkAction(type, target, serviceCall, selector = () => {}) {
  return composeInjections(baseThunkAction(type, target, serviceCall, selector));
}

export default createThunkAction;
