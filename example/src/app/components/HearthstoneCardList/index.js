import React, { Component } from 'react';
import { connect } from 'react-redux';

import HearthstoneService from '../../../services/HearthstoneService';

import HearthstoneCard from './components/HearthstoneCard';
import './styles.css';

class HearthStoneCardList extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
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
  cardList: []
};

const mapStateToProps = store => ({
  cardList: store.hearthstone.cards,
  loading: store.hearthstone.cardsLoading
});

export default connect(mapStateToProps)(HearthStoneCardList);
