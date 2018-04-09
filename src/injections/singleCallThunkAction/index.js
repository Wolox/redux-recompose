function singleCallThunkAction({ service, payload = () => {} }) {
  const selector = typeof payload === 'function' ? payload : () => payload;

  return {
    apiCall: async getState => service(selector(getState())),
    determination: response => response.ok
  };
}

export default singleCallThunkAction;
