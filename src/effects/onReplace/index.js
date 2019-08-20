import validate from '../validate';

function onReplace() {
  return validate({
    name: 'onReplace',
    realTarget: action => action.target,
    do: (action, state) => {
      const {
        payload, index, condition, target
      } = action;
      const array = [...state[target]];
      if (condition) return array.map(element => (condition(element) ? payload : element));
      if (index) array[index] = payload;
      return [...array];
    }
  });
}

export default onReplace;
