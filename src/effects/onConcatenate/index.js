import validate from '../validate';

function onConcatenate(selector = action => action.payload) {
  return validate({
    name: 'onConcatenate',
    realTarget: action => action.target,
    do: (action, state) => state[action.target].concat(selector(action))
  });
}

export default onConcatenate;
