import validate from '../validate';

function setValue(value) {
  return validate({
    name: 'onSetValue',
    realTarget: action => action.target,
    do: () => value
  });
}

export default setValue;
