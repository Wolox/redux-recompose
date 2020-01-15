import Immutable from 'seamless-immutable';

import createReducer from '../../creators/createReducer';

import onSuccessPagination from '.';

const initialState = {
  target: null,
  targetLoading: true,
  targetError: 'Some error'
};

const setUp = {
  state: null
};

beforeEach(() => {
  setUp.state = Immutable(initialState);
});

describe('onSuccessPagination', () => {
  it('Sets correctly target with error, loading, totalPages, nextPages y TotalItems', () => {
    const reducer = createReducer(setUp.state, {
      '@@ACTION/TYPE': onSuccessPagination()
    });
    const newState = reducer(setUp.state, {
      type: '@@ACTION/TYPE',
      target: 'target',
      payload: {
        list: ['item 1', 'item 2'],
        meta: { totalPages: 1, currentPage: 1, totalItems: 2 }
      }
    });
    expect(newState).toEqual({
      target: ['item 1', 'item 2'],
      targetLoading: false,
      targetError: null,
      targetTotalPages: 1,
      targetNextPage: 2,
      targetTotalItems: 2
    });
  });
});
