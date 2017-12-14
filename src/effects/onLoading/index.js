import validate from '../validate';

function onLoading(condition = () => true) {
  return validate({
    name: 'onLoading',
    realTarget: action => `${action.target}Loading`,
    do: condition
  });
}

export default onLoading;
