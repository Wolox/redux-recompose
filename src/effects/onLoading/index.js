import validate from '../validate';

function onLoading(condition = () => true) {
  return validate({
    name: 'onLoading',
    realTarget: action => `${action.target}Loading`,
    do: (state, action) => state.merge({ [`${action.target}Loading`]: condition(action, state) })
  });
}

export default onLoading;
