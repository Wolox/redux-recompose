import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles.css';

import hearthstoneActions from '../redux/hearthstone/actions';

import HearthstoneCardList from './components/HearthstoneCardList';

class App extends Component {
  componentDidMount() {
    setInterval(() => this.props.dispatch(hearthstoneActions.otherAction()), 500);
  }

  render() {
    return (
      <div className="App">
        <h3>{`Tick Count: ${this.props.tickCount}`}</h3>
        <HearthstoneCardList />
      </div>
    );
  }
}

const mapStateToProps = store => ({
  tickCount: store.hearthstone.count
});

export default connect(mapStateToProps)(App);
