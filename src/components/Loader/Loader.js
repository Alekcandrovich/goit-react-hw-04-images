import React from 'react';
import PropTypes from 'prop-types';
import { RotatingLines } from 'react-loader-spinner';

const CustomLoader = ({
  strokeColor = 'blue',
  strokeWidth = 3,
  animationDuration = 0.90,
  width = 100,
  visible = true,
}) => (
        <div className="loader_center loader_overlay">
          <RotatingLines
            strokeColor={strokeColor}
            strokeWidth={strokeWidth}
            animationDuration={animationDuration}
            width={width}
            visible={visible}
          />
        </div>
)

CustomLoader.propTypes = {
  strokeColor: PropTypes.string,
  strokeWidth: PropTypes.number,
  animationDuration: PropTypes.number,
  width: PropTypes.number,
  visible: PropTypes.bool,
};

export default CustomLoader;