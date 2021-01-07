function pollingAction(action) {
  const {
    type,
    target,
    service,
    payload = () => {},
    successSelector = response => response.data,
    failureSelector = response => response.problem,
    timeout = 5000,
    shouldRetry,
    determination = response => response.ok
  } = action;
  const selector = typeof payload === 'function' ? payload : () => payload;

  return {
    prebehavior: dispatch => dispatch({ type, target }),
    apiCall: async getState => service(selector(getState())),
    determination,
    success: (dispatch, response) => dispatch({
      type: `${type}_SUCCESS`,
      target,
      payload: successSelector(response),
      isPolling: true
    }),
    failure: (dispatch, response, state) => {
      if (shouldRetry(response, state)) {
        const timeoutID = setTimeout(() => dispatch(action), timeout);
        dispatch({
          type: `${type}_RETRY`,
          target,
          payload: { timeoutID, error: failureSelector(response) }
        });
      } else {
        dispatch({
          type: `${type}_FAILURE`,
          target,
          payload: failureSelector(response),
          isPolling: true
        });
      }
    }
  };
}

export default pollingAction;
