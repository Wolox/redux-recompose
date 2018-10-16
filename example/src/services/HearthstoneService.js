import { wrapService, withPostSuccess } from 'redux-recompose';

import responseBody from './response';

// Declare your api calls
const getCards = async () => new Promise(resolve => setTimeout(() => resolve(responseBody), 1000));

// Declare your customizations, used by fetchMiddleware
getCards.successSelector = response => response.cards;
getCards.injections = [
  withPostSuccess((dispatch, response, state) => alert(`Fetched at: ${state.hearthstone.count}`))
];

const service = {
  getCards
};

// Export your service by also specifying the reducer name and the target for each action.
export default wrapService(service, 'hearthstone', { getCards: 'cards' });
