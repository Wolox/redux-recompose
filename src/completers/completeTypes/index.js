import * as yup from 'yup';

const primaryActionsCompleter = primaryActions => primaryActions.flatMap(
  type => [type, `${type}_SUCCESS`, `${type}_FAILURE`]
);

const schema = yup.object().shape({
  primaryActions: yup.array().of(yup.string().typeError('primaryActions should be an array of strings')).typeError('primaryActions should be an array'),
  ignoredActions: yup.array().of(yup.string().typeError('ignoredActions should be an array of strings')).typeError('ignoredActions should be an array'),
  customCompleters: yup.array().of(yup.object().shape({
    completer: yup.mixed().test(value => typeof value === 'function').typeError('completer should be a function'),
    actions: yup.array().of(yup.string().typeError('actions should be an array of strings')).typeError('actions should be an array')
  }))
}).typeError('reducerDescription should be an object');

function completeTypes(params) {
  schema.validateSync(params);
  const { primaryActions = [], ignoredActions = [], customCompleters = [] } = params;

  const primaryTypes = primaryActionsCompleter(primaryActions);
  const customCompletedTypes = customCompleters.flatMap(({ actions, completer }) => actions.flatMap(completer));
  return [...primaryTypes, ...ignoredActions, ...customCompletedTypes];
}

export default completeTypes;
