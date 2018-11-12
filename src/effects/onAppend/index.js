import validate from '../validate';

function onAppend(selector = action => action.payload) {
  return validate({
    name: 'onAppend',
    realTarget: action => action.target,
    do: (action, state) => [...state[action.target], selector(action)]
  });
}

export default onAppend;
