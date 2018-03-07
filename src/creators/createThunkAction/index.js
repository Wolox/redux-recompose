import composeInjections from '../../injections/composeInjections';
import baseThunkAction from '../../injections/baseThunkAction';

function createThunkAction(type, target, serviceCall, payload = () => {}) {
  console.warning('redux-recompose: createThunkAction is deprecated. Use fetch middleware instead.');
  return composeInjections(baseThunkAction({
    type,
    target,
    serviceCall,
    payload
  }));
}

export default createThunkAction;
