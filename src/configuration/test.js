import configureMergeState, { mergeState } from '.';

describe('configureMergeState', () => {
  it('Should allow state configuration', () => {
    configureMergeState((state, content) => ({ ...state, ...content }));
    const state = {};
    const modifiedState = mergeState(state, { content: 'type' });
    expect(modifiedState).toEqual({ content: 'type' });
    expect(modifiedState === state).toBe(false);
  });
});
