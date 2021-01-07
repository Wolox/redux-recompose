import * as yup from 'yup';

const customCompleter = (typesCompleters) => typesCompleters.flatMap(({ actions, completer }) => actions.flatMap(completer));

const schema = yup.object().shape({
  primaryActions: yup.array().of(yup.string().typeError('primaryActions should be an array of strings')).typeError('primaryActions should be an array'),
  ignoredActions: yup.array().of(yup.string().typeError('ignoredActions should be an array of strings')).typeError('ignoredActions should be an array'),
  pollingActions: yup.array().of(yup.string().typeError('pollingActions should be an array of strings')).typeError('pollingActions should be an array'),
  customCompleters: yup.array().of(yup.object().shape({
    completer: yup.mixed().test(value => typeof value === 'function').typeError('completer should be a function'),
    actions: yup.array().of(yup.string().typeError('actions should be an array of strings')).typeError('actions should be an array')
  }))
}).typeError('reducerDescription should be an object');

function completeTypes(params) {
  schema.validateSync(params);
  const {
    primaryActions = [], ignoredActions = [], customCompleters = [], pollingActions = []
  } = params;

  const primaryTypes = customCompleter([{ actions: primaryActions, completer: type => [type, `${type}_SUCCESS`, `${type}_FAILURE`] }]);
  const pollingTypes = customCompleter([{ actions: pollingActions, completer: type => [type, `${type}_SUCCESS`, `${type}_FAILURE`, `${type}_RETRY`] }]);
  const customCompletedTypes = customCompleter(customCompleters);
  return [...primaryTypes, ...pollingTypes, ...customCompletedTypes, ...ignoredActions];
}

export default completeTypes;
