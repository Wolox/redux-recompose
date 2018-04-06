import mergeInjections from '../mergeInjections';

function composeInjections(...injections) {
  const injectionsDescription = mergeInjections(injections);

  const {
    prebehavior = () => {},
    apiCall = () => {},
    determination = () => true,
    success = () => {},
    postSuccess = () => {},
    postBehavior = () => {},
    postFailure = () => {},
    failure = () => {},
    statusHandler = () => true
  } = injectionsDescription;

  return async (dispatch, getState) => {
    prebehavior(dispatch);
    const response = await apiCall(getState);
    postBehavior(dispatch, response);
    if (determination(response)) {
      const shouldContinue = success(dispatch, response);
      if (shouldContinue) postSuccess(dispatch, response);
    } else {
      const shouldContinue = statusHandler(dispatch, response);
      if (shouldContinue) {
        failure(dispatch, response);
        postFailure(dispatch, response);
      }
    }
  };
}

export default composeInjections;
