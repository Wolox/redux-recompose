function composeInjections(...decorators) {
  const decoratorDescription = decorators.reduce((a, b) => ({ ...a, ...b }), {});

  const {
    prebehavior = () => {},
    apiCall = () => {},
    determination = () => true,
    success = () => {},
    postBehavior = () => {},
    failure = () => {},
    statusHandler = () => true
  } = decoratorDescription;

  return async (dispatch, getState) => {
    prebehavior(dispatch);
    const response = await apiCall(getState);
    if (determination(response)) {
      const shouldContinue = success(dispatch, response);
      if (shouldContinue) postBehavior(dispatch, response);
    } else {
      const shouldContinue = statusHandler(dispatch, response);
      if (shouldContinue) failure(dispatch, response);
    }
  };
}

export default composeInjections;
