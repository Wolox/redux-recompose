import validate from '../validate';

function onToggle(selector = action => action.payload) {
  return validate({
    name: 'onToggle',
    realTarget: action => action.target,
    do: (action, state) => (selector(action, state) === undefined ? !state[action.target] : selector(action, state))
  });
}

export default onToggle;
