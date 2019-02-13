function withStatusHandling(statusHandlerDescription) {
  return {
    statusHandler: (dispatch, response, state) => (
      statusHandlerDescription[response.status] ?
        statusHandlerDescription[response.status](dispatch, response, state) :
        () => true)
  };
}

export default withStatusHandling;
