// eslint-disable-next-line no-underscore-dangle
global.__redux_recompose_merge = (state, content) => ({ ...state, ...content });
// global.__redux_recompose_merge = (state, content) => state.merge(content);

// This will be exported as configureMergeState at main file
export default modifier => {
  // eslint-disable-next-line no-underscore-dangle
  global.__redux_recompose_merge = modifier;
};

// eslint-disable-next-line no-underscore-dangle
export const mergeState = (state, content) => global.__redux_recompose_merge(state, content);
