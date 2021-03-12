import { mergeState } from '../../configuration';

// TODO: Add support and validations for multi target actions

function onSuccessPagination(selector = action => action.payload) {
  return (state, action) =>
    (selector(action).list
      ? mergeState(state, {
        [`${action.target}Loading`]: false,
        [`${action.target}Error`]: null,
        [`${action.target}`]:
            Number(selector(action).meta.currentPage) === 1
              ? selector(action).list
              : state[action.target].concat(selector(action).list),
        [`${action.target}TotalPages`]: Number(selector(action).meta.totalPages),
        [`${action.target}NextPage`]: Number(selector(action).meta.currentPage) + 1,
        ...(selector(action).meta.totalItems && {
          [`${action.target}TotalItems`]: Number(selector(action).meta.totalItems)
        })
      })
      : mergeState(state, {
        [`${action.target}Loading`]: false,
        [`${action.target}Error`]: null
      }));
}

export default onSuccessPagination;
