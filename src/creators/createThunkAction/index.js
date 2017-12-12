function createThunkAction(type, target, serviceCall, selector = () => {}) {
  return async (dispatch, getState) => {
    dispatch({ type, target: `${target}Loading` });
    const response = await serviceCall(selector(getState()));
    if (response.ok) {
      dispatch({ type: `${type}_SUCCESS`, payload: response.data, target });
    } else {
      dispatch({ type: `${type}_FAILURE`, payload: response.problem, target: `${target}Error` });
    }
  };
}

export default createThunkAction;
