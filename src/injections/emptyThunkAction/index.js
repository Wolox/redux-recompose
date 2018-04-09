function emptyThunkAction({ type, service, payload = () => {} }) {
  const selector = typeof payload === 'function' ? payload : () => payload;

  return {
    prebehavior: dispatch => dispatch({ type }),
    apiCall: async getState => service(selector(getState())),
    determination: response => response.ok
  };
}

export default emptyThunkAction;
