import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import * as Routes from '../../components/Routes/constants';

import Home from './screens/Home';

function Dashboard() {
  return (
    <Switch>
      <Route exact path={Routes.HOME} component={Home} />
      <Route render={() => <Redirect to={Routes.HOME} />} />
    </Switch>
  );
}

Dashboard.defaultProps = {
  loading: false
};

export default connect()(Dashboard);
