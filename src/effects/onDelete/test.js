import Immutable from 'seamless-immutable';

import createReducer from '../../creators/createReducer';

import onDelete from '.';

const initialState = {
  numberList: [4, 2, 3, 4, 1],
  objectList: [{ id: 1 }, { id: 2 }, { id: 3 }],
  dragonList: [
    { name: 'Ysera', color: 'green' },
    { name: 'Nefarian', color: 'red' },
    { name: 'Chromaggus', color: 'blue' },
    { name: 'Alexstraza', color: 'gray' },
    { name: 'Nozdormu', color: 'yellow' },
    { name: 'DeathWing', color: 'black' },
    { name: 'Red-Eyes Black Dragon', color: 'black' }
  ]
};

const setUp = {
  state: null
};

beforeEach(() => {
  setUp.state = Immutable(initialState);
});

describe('onDelete', () => {
  it('Deletes objects based on IDs by default', () => {
    const reducer = createReducer(setUp.state, {
      '@@ACTION/FILTER_OBJECT': onDelete()
    });
    const newState = reducer(setUp.state, { type: '@@ACTION/FILTER_OBJECT', payload: 2, target: 'objectList' });
    expect(newState.objectList).toEqual([{ id: 1 }, { id: 3 }]);
  });

  it('Deletes objects based on a payload', () => {
    const reducer = createReducer(setUp.state, {
      '@@ACTION/FILTER_OBJECT': onDelete(action => action.payload.id)
    });
    const newState = reducer(setUp.state, { type: '@@ACTION/FILTER_OBJECT', payload: { id: 1 }, target: 'objectList' });
    expect(newState.objectList).toEqual([{ id: 2 }, { id: 3 }]);
  });

  it('Deletes objects based on items characteristics', () => {
    const reducer = createReducer(setUp.state, {
      // item => item.id is the item selector by default
      '@@ACTION/FILTER_NUMBER': onDelete(null, item => item)
    });
    const newState = reducer(setUp.state, { type: '@@ACTION/FILTER_NUMBER', payload: 4, target: 'numberList' });
    expect(newState.numberList).toEqual([2, 3, 1]);
  });

  it('May combine action and item selectors with a custom comparison', () => {
    const reducer = createReducer(setUp.state, {
      '@@ACTION/FILTER_DRAGONS': onDelete(
        null, null,
        (item, action) => action.payload.name === item.name || action.payload.color === item.color
      )
    });
    const newState = reducer(setUp.state, { type: '@@ACTION/FILTER_DRAGONS', payload: { color: 'black', name: 'Ysera' }, target: 'dragonList' });
    expect(newState.dragonList).toEqual([
      { name: 'Ysera', color: 'green' },
      { name: 'DeathWing', color: 'black' },
      { name: 'Red-Eyes Black Dragon', color: 'black' }
    ]);
  });
});
