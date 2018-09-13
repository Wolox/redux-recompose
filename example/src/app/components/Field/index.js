import React from 'react';
import PropTypes from 'prop-types';

export function wrapField(WrappedComponent) {
  function Field({ input, ...props }) {
    return <WrappedComponent {...input} {...props} />;
  }

  Field.propTypes = {
    input: PropTypes.shape({
      name: PropTypes.string,
      onBlur: PropTypes.func,
      onChange: PropTypes.func,
      onDragStart: PropTypes.func,
      onDrop: PropTypes.func,
      onFocus: PropTypes.func,
      value: PropTypes.string
    }).isRequired
  };

  return Field;
}
