import { wrapService, withPostSuccess } from 'redux-recompose';

import responseBody from './response';

const getCards = async () => new Promise(resolve => setTimeout(() => resolve(responseBody), 1000));
getCards.successSelector = response => response.cards;
getCards.injections = [
  withPostSuccess((dispatch, response, state) => alert(`Fetched at: ${state.hearthstone.count}`))
];

const service = {
  getCards
};

export default wrapService(service, 'hearthstone', { getCards: 'cards' });
