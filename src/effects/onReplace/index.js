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
      if (index) array[index] = payload;
      else if (condition) {
        const arrayFilter = array.filter(condition);
        arrayFilter.forEach(item => {
          const i = array.indexOf(item);
          array[i] = payload;
        });
      }
      return [...array];
    }
  });
}

export default onReplace;
