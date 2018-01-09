import validate from '../validate';

function onDeleteByIndex(selector = action => action.payload) {
  return validate({
    name: 'onDeleteByIndex',
    realTarget: action => action.target,
    do: (action, state) => {
      const selectedIndex = selector(action, state);
      return selectedIndex === -1
        ? state[`${action.target}`]
        : [
          ...state[`${action.target}`].slice(0, selector(action, state)),
          ...state[`${action.target}`].slice(selector(action, state) + 1)
        ];
    }
  });
}

export default onDeleteByIndex;
