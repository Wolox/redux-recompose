import * as yup from 'yup';

const schema = yup.object().shape({
  description: yup.object().required('description is required').typeError('description should be an object'),
  targetCompleters: yup.array().of(yup.object().shape({
    targets: yup.array().of(yup.string()),
    completer: yup.mixed().test(value => typeof value === 'function')
  }).typeError('targetCompleters should be an array of objects')).typeError('targetCompleters should be an array'),
  ignoredTargets: yup.object().typeError('ignoredTargets should be an object')
});

function customComplete(targetCompleters) {
  return targetCompleters.flatMap(({ completer, targets }) => targets
    .map(completer))
    .reduce((acc, value) => ({ ...acc, ...value }), {});
}

function completeState(params) {
  schema.validateSync(params);
  const { description, targetCompleters = [], ignoredTargets = {} } = params;

  const primaryState = customComplete([{
    targets: Object.keys(description),
    completer: key => ({
      [key]: description[key],
      [`${key}Loading`]: false,
      [`${key}Error`]: null
    })
  }]);

  const customCompleters = customComplete(targetCompleters);

  return { ...primaryState, ...customCompleters, ...ignoredTargets };
}

export default completeState;
