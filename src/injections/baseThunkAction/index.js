function baseThunkAction({
  type,
  target,
  service,
  payload = () => {},
  paginationAction,
  reducerName,
  refresh = true,
  successSelector = response => response.data,
  failureSelector = response => response.problem
}) {
  const pageSelector = state =>
    paginationAction && {
      totalPages: state[reducerName][`${target}TotalPages`],
      nextPage: refresh ? 1 : state[reducerName][`${target}NextPage`]
    };
  const selector = typeof payload === "function" ? payload : () => payload;

  const finalSelector = state =>
    paginationAction
      ? { ...pageSelector(state), ...selector(state) }
      : selector(state);
  return {
    prebehavior: dispatch => dispatch({ type, target }),
    apiCall: async getState => service(finalSelector(getState())),
    determination: response => response.ok,
    success: (dispatch, response) =>
      dispatch({
        type: `${type}_SUCCESS`,
        target,
        payload: successSelector(response)
      }),
    failure: (dispatch, response) =>
      dispatch({
        type: `${type}_FAILURE`,
        target,
        payload: failureSelector(response)
      })
  };
}

export default baseThunkAction;
