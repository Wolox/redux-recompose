import { createTypes, completeTypes } from 'redux-recompose';

import HearthstoneService from '../../services/HearthstoneService';

export const actions = createTypes(completeTypes(['GET_CARDS'], ['OTHER_ACTION']), '@@HEARTHSTONE');

const actionCreators = {
  getHearthstoneCards: () => ({
    type: actions.GET_CARDS,
    service: HearthstoneService.getCards,
    target: 'cards'
  }),
  otherAction: () => ({ type: actions.OTHER_ACTION })
};

export default actionCreators;
