import validate from '../validate';

function onCycle() {
  return validate({
    name: 'onCycle',
    realTarget: action => action.target,
    do: (action, state) => {
      const { step = 1, target } = action;
      const array = state[target];
      const index = step > 0 ? step : array.length + step;
      return [...array.slice(index), ...array.slice(0, index)];
    }
  });
}

export default onCycle;
