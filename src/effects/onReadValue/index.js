import validate from '../validate';

function onReadValue(selector = action => action.payload) {
  return validate({
    name: 'onReadValue',
    realTarget: action => action.target,
    do: selector
  });
}

export default onReadValue;
