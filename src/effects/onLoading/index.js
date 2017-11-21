import validate from '../validate';

function onLoading(condition = () => true) {
  return validate({
    name: 'onLoading',
    do: (state, action) => state.merge({ [`${action.target}Loading`]: condition(action, state) })
  });
}

export default onLoading;
