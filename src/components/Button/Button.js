import React from 'react';
import PropTypes from 'prop-types';
import css from './button.module.css';

const Button = ({ onClick }) => (
  
  <div className={css.btnContainer}>
      <button type="button" className={css.load_more} onClick={onClick}>
        Load more
      </button>
  </div>
  )

Button.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default Button;