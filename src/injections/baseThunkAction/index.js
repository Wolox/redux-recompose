function baseThunkAction({
  type,
  target,
  service,
  payload = () => {},
  successData = response => response.data,
  failureData = response => response.problem
}) {
  const selector = typeof payload === 'function' ? payload : () => payload;

  return {
    prebehavior: dispatch => dispatch({ type, target }),
    apiCall: async getState => service(selector(getState())),
    determination: response => response.ok,
    success: (dispatch, response) => dispatch({ type: `${type}_SUCCESS`, target, payload: successData(response) }),
    failure: (dispatch, response) => dispatch({ type: `${type}_FAILURE`, target, payload: failureData(response) })
  };
}

export default baseThunkAction;
