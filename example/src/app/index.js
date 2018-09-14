import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './styles.css';

import hearthstoneActions from '../redux/hearthstone/actions';

import HearthstoneCardList from './components/HearthstoneCardList';

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    setInterval(() => dispatch(hearthstoneActions.otherAction()), 500);
  }

  render() {
    const { tickCount } = this.props;
    return (
      <div className="App">
        <h3>{`Tick Count: ${tickCount}`}</h3>
        <HearthstoneCardList />
      </div>
    );
  }
}

const mapStateToProps = store => ({
  tickCount: store.hearthstone.count
});

App.propTypes = {
  tickCount: PropTypes.number
};

export default connect(mapStateToProps)(App);
