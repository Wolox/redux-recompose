import mergeInjections from '../mergeInjections';

function composeInjections(...injections) {
  const injectionsDescription = mergeInjections(injections);

  const {
    prebehavior = () => {},
    apiCall = () => {},
    determination = () => true,
    success = () => true,
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
      const shouldContinue = success(dispatch, response, getState());
      if (shouldContinue) postSuccess(dispatch, response, getState());
    } else {
      const shouldContinue = statusHandler(dispatch, response, getState());
      if (shouldContinue) {
        failure(dispatch, response, getState());
        postFailure(dispatch, response, getState());
      }
    }
  };
}

export default composeInjections;
