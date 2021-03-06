import * as yup from 'yup';

const schema = yup.object().shape({
  description: yup.object().typeError('description should be an object'),
  targetCompleters: yup.array().of(yup.object().shape({
    targets: yup.array().of(yup.string()),
    completer: yup.mixed().test(value => typeof value === 'function')
  }).typeError('targetCompleters should be an array of objects')).typeError('targetCompleters should be an array'),
  ignoredTargets: yup.object().typeError('ignoredTargets should be an object'),
  pollingTargets: yup.object().typeError('pollingTargets should be an object')
});

function customComplete(targetCompleters) {
  return targetCompleters.flatMap(({ completer, targets }) => targets
    .map(completer))
    .reduce((acc, value) => ({ ...acc, ...value }), {});
}

function completeState(params) {
  schema.validateSync(params);
  const {
    description = {}, targetCompleters = [], ignoredTargets = {}, pollingTargets = {}
  } = params;

  const primaryState = customComplete([{
    targets: Object.keys(description),
    completer: key => ({
      [key]: description[key],
      [`${key}Loading`]: false,
      [`${key}Error`]: null
    })
  }]);

  const pollingState = customComplete([{
    targets: Object.keys(pollingTargets),
    completer: key => ({
      [key]: pollingTargets[key],
      [`${key}Loading`]: false,
      [`${key}Error`]: null,
      [`${key}IsRetrying`]: false,
      [`${key}RetryCount`]: 0,
      [`${key}TimeoutID`]: null
    })
  }]);

  const customCompleters = customComplete(targetCompleters);

  return {
    ...primaryState, ...pollingState, ...customCompleters, ...ignoredTargets
  };
}

export default completeState;
