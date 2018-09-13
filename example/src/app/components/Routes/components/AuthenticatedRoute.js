import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

import * as Routes from '../constants';

const DEFAULT_PUBLIC_ROUTE = Routes.LOGIN;
const DEFAULT_PRIVATE_ROUTE = Routes.HOME;

function AuthenticatedRoute({
  // TODO Add this if you need it
  // device,
  isPublicRoute,
  isPrivateRoute,
  initialized,
  currentUser,
  component: Comp,
  ...props
}) {
  return (
    <Route
      {...props}
      render={routeProps => {
        // TODO Add this if you need it
        // if (device.isMobile && !device.adviceSubmitted) {
        //   return <AppDownloader />;
        // }
        if (initialized) {
          if (isPublicRoute) {
            // TODO Add this if you need it
            // if (currentUser && isPublicRoute) {
            // do not allow logged users to access public routes. redirect to app
            return (
              <Redirect
                to={{
                  pathname: DEFAULT_PUBLIC_ROUTE,
                  state: { from: props.location }
                }}
              />
            );
          } else if (isPrivateRoute) {
            // do not allow unlogged users to access app. redirect to signin
            return (
              <Redirect
                to={{
                  pathname: DEFAULT_PRIVATE_ROUTE,
                  state: { from: props.location }
                }}
              />
            );
          }
        }
        return <Comp {...routeProps} />;
      }}
    />
  );
}

AuthenticatedRoute.defaultProps = {
  // TODO Add this if you need it
  // currentUser: false,
  // isPublicRoute: true,
  initialized: false
};

AuthenticatedRoute.propTypes = {
  ...Route.propTypes,
  // TODO Add this if you need it
  // currentUser: PropTypes.bool,
  isPrivateRoute: PropTypes.bool,
  isPublicRoute: PropTypes.bool,
  initialized: PropTypes.bool
};

export default withRouter(connect()(AuthenticatedRoute));
