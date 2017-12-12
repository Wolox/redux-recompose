function withStatusHandling(statusHandlerDescription) {
  return {
    statusHandler: (dispatch, response) =>
      statusHandlerDescription[response.status] &&
      statusHandlerDescription[response.status](dispatch, response)
  };
}

export default withStatusHandling;
