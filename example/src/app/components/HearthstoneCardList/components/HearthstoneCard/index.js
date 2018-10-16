import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

function HearthStoneCard({ name, source }) {
  return (
    <div className="hs-card" key={name}>
      <h2>{name}</h2>
      <img src={source} alt="" />
    </div>
  );
}

HearthStoneCard.propTypes = {
  name: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired
};

export default HearthStoneCard;
