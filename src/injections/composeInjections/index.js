import mergeInjections from '../mergeInjections';

const checkPaginationNotHasFinished = (state, pageSelector) =>
  pageSelector.refresh ||
  state[pageSelector.reducerName][`${pageSelector.target}NextPage`] <=
    state[pageSelector.reducerName][`${pageSelector.target}TotalPages`];

function composeInjections(...injections) {
  const injectionsDescription = mergeInjections(injections);

  const {
    prebehavior = () => {},
    apiCall = () => {},
    determination = () => true,
    success = () => true,
    postSuccess = () => {},
    postBehavior = () => {},
    postFailure = () => {},
    failure = () => {},
    statusHandler = () => true,
    pageSelector,
    paginationAction
  } = injectionsDescription;

  return async (dispatch, getState) => {
    prebehavior(dispatch);
    const paginationNotHasFinished =
      paginationAction && checkPaginationNotHasFinished(getState(), pageSelector);
    const response = paginationAction
      ? paginationNotHasFinished && (await apiCall(getState))
      : await apiCall(getState);
    postBehavior(dispatch, response);
    if (
      (paginationAction && paginationNotHasFinished && determination(response)) ||
      (paginationAction && !paginationNotHasFinished) ||
      determination(response)
    ) {
      const shouldContinue = success(dispatch, response, getState());
      if (shouldContinue) postSuccess(dispatch, response, getState());
    } else {
      const shouldContinue = statusHandler(dispatch, response, getState());
      if (shouldContinue) {
        failure(dispatch, response, getState());
        postFailure(dispatch, response, getState());
      }
    }
  };
}

export default composeInjections;
