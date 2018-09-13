import createReducer from '../../creators/createReducer';
import onLoading from '../../effects/onLoading';
import onSuccess from '../../effects/onSuccess';
import onFailure from '../../effects/onFailure';

// TODO: Let the user specify selectors
const reducerDescription = {
  LOADING: onLoading(),
  SUCCESS: onSuccess(),
  FAILURE: onFailure()
};

export const defaultActionNames = Object.keys(reducerDescription);

// TODO: Let user specify this initialState
export default createReducer({}, reducerDescription);
