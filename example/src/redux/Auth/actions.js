import { push } from 'react-router-redux';

import * as AuthService from '../../services/AuthServices';
import * as RouteConstants from '../../app/components/Routes/constants';
import { stringArrayToObject } from '../../utils/array';

/* ------------- Auth actions ------------- */
export const actions = stringArrayToObject(
  ['LOGIN', 'LOGIN_SUCCESS', 'LOGIN_FAILURE', 'LOGOUT', 'AUTH_INIT'],
  '@@AUTH'
);

const privateActionCreators = {
  loginSuccess(authData) {
    return {
      type: actions.LOGIN_SUCCESS,
      payload: { authData }
    };
  },
  loginFailure(err) {
    return {
      type: actions.LOGIN_FAILURE,
      payload: { err }
    };
  }
};

export const actionCreators = {
  init(user) {
    return {
      type: actions.AUTH_INIT,
      payload: { user }
    };
  },
  login(authData) {
    return async dispatch => {
      dispatch({ type: actions.LOGIN });
      try {
        const response = await AuthService.login(authData);
        if (response.ok) {
          await AuthService.setCurrentUser(response.data);
          dispatch(privateActionCreators.loginSuccess(response.data));
          dispatch(push(RouteConstants.HOME));
        } else {
          throw new Error('Invalid credentials');
        }
      } catch (e) {
        dispatch(privateActionCreators.loginFailure(e));
      }
    };
  },
  logout() {
    return async dispatch => {
      await AuthService.removeCurrentUser();
      dispatch({ type: actions.LOGOUT });
      dispatch(push(RouteConstants.LOGIN));
    };
  }
};
