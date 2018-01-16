import validate from '../validate';

function onDelete(leftSelector, rightSelector, filter) {
  const safeLeftSelector = leftSelector || (action => action.payload);
  const safeRightSelector = rightSelector || (item => item.id);
  const safeFilter = filter || (
    (item, action) => safeLeftSelector(action, item) !== safeRightSelector(item, action)
  );

  return validate({
    name: 'onDelete',
    realTarget: action => action.target,
    do: (action, state) => state[`${action.target}`].filter(item => safeFilter(item, action))
  });
}

export default onDelete;
