function externalBaseAction({
  target,
  service,
  payload = () => {},
  successSelector = response => response.data,
  failureSelector = response => response.problem,
  external: $
}) {
  const selector = typeof payload === 'function' ? payload : () => payload;

  return {
    prebehavior: dispatch => dispatch({ type: $.LOADING, target }),
    apiCall: async getState => service(selector(getState())),
    determination: response => response.ok,
    success: (dispatch, response) => dispatch({ type: $.SUCCESS, target, payload: successSelector(response) }),
    failure: (dispatch, response) => dispatch({ type: $.FAILURE, target, payload: failureSelector(response) })
  };
}

export default externalBaseAction;
