import React, { Component } from 'react'
import PropTypes from 'prop-types'
import config from 'vtex-tachyons/config.json'

class EmptySearchIcon extends Component {
  render() {
    return (
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 16 16"
        xmlSpace="preserve"
        width="16"
        height="16"
      >
        <g className="nc-icon-wrapper" fill="#368df7">
          <circle
            fill="none"
            stroke="#368df7"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            cx="8.5"
            cy="8.5"
            r="7"
          />
          {' '}
          <line
            data-color="color-2"
            fill="none"
            stroke="#368df7"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            x1="8.5"
            y1="4.5"
            x2="8.5"
            y2="12.5"
          />
          <line
            data-color="color-2"
            fill="none"
            stroke="#368df7"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            x1="4.5"
            y1="8.5"
            x2="12.5"
            y2="8.5"
          />
        </g>
      </svg>
    )
  }
}

EmptySearchIcon.defaultProps = {
  stroke: config.colors['rebel-pink'],
}

EmptySearchIcon.propTypes = {
  stroke: PropTypes.string.isRequired,
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
}

export default EmptySearchIcon
