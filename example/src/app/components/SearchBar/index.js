import React from 'react';
import PropTypes from 'prop-types';

function SearchBarContainer({
  textButtonSearch,
  className,
  formClassName,
  buttonClassName,
  handleSubmit,
  children
}) {
  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className={formClassName}>
        {children}
        <button className={buttonClassName} type="submit">
          {textButtonSearch}
        </button>
      </form>
    </div>
  );
}

SearchBarContainer.propTypes = {
  textButtonSearch: PropTypes.string,
  className: PropTypes.string,
  formClassName: PropTypes.string,
  buttonClassName: PropTypes.string,
  children: PropTypes.node,
  handleSubmit: PropTypes.func.isRequired
};

SearchBarContainer.defaultProps = {
  className: '',
  buttonClassName: '',
  textButtonSearch: 'Buscar'
};

export default SearchBarContainer;
