import validate from '../validate';

function onSpreadValue(selector = action => action.payload) {
  return validate({
    name: 'onSpreadValue',
    do: selector,
    spread: true
  });
}

export default onSpreadValue;
