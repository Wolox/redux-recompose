import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import HearthstoneService from '../../../services/HearthstoneService';

import HearthstoneCard from './components/HearthstoneCard';
import './styles.css';

class HearthStoneCardList extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    // Dispatches a service method ! Wtf ?
    dispatch(HearthstoneService.getCards());
  }

  render() {
    const { loading, cardList } = this.props;
    if (loading) {
      return <h1>Loading...</h1>;
    }

    return <div className="hs-list">{cardList.map(HearthstoneCard)}</div>;
  }
}

HearthStoneCardList.defaultProps = {
  // Initial state won't be declared so we use them with defaultProps
  cardList: []
};

const mapStateToProps = store => ({
  cardList: store.hearthstone.cards,
  loading: store.hearthstone.cardsLoading
});

HearthStoneCardList.propTypes = {
  loading: PropTypes.bool,
  cardList: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string, source: PropTypes.string }))
};

export default connect(mapStateToProps)(HearthStoneCardList);
