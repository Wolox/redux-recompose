import Immutable from 'seamless-immutable';

import completeState from '.';

const initialState = {
  target: 1,
  otherTarget: 2
};

const setUp = {
  state: null
};

beforeEach(() => {
  setUp.state = Immutable(initialState);
});

describe('completeState', () => {
  it('Extends all fields by default', () => {
    expect(completeState(setUp.state)).toEqual({
      target: 1,
      targetLoading: false,
      targetError: null,
      otherTarget: 2,
      otherTargetLoading: false,
      otherTargetError: null
    });
  });
  it('Extends only fields that are not excluded', () => {
    expect(completeState(setUp.state, ['otherTarget'])).toEqual({
      target: 1,
      targetLoading: false,
      targetError: null,
      otherTarget: 2
    });
  });
});
