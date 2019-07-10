import validate from '../validate';

function onCycle() {
  return validate({
    name: 'onCycle',
    realTarget: action => action.target,
    do: (action, state) => {
      const { step, target } = action;
      const array = state[target];
      const index = step ? (step > 0 ? step : array.length + step) : 1;
      return [...array.slice(index), ...array.slice(0,index)];
    }
  });
}

export default onCycle;
