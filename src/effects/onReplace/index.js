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
      if (condition) {
        const arrayFilter = array.filter(condition);
        return array.map(item => (arrayFilter.includes(item) ? payload : item));
      }
      if (index) array[index] = payload;
      return [...array];
    }
  });
}

export default onReplace;
