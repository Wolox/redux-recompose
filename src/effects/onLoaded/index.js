import validate from '../validate';

function onLoaded(condition = () => false) {
  return validate({
    name: 'onLoaded',
    realTarget: action => `${action.target}Loading`,
    do: condition
  });
}

export default onLoaded;
