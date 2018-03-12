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
        viewBox="0 0 64 64"
        xmlSpace="preserve"
        width="64"
        height="64"
      >
        <g fill="#368df7">
          <line
            data-cap="butt"
            data-color="color-2"
            fill="none"
            stroke={this.props.stroke}
            strokeWidth="2"
            strokeMiterlimit="10"
            x1="60"
            y1="60"
            x2="43"
            y2="43"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <circle
            fill="none"
            stroke={this.props.stroke}
            strokeWidth="2"
            strokeLinecap="round"
            strokeMiterlimit="10"
            cx="26"
            cy="26"
            r="24"
            strokeLinejoin="round"
          />
          <line
            data-color="color-2"
            fill="none"
            stroke={this.props.stroke}
            strokeWidth="2"
            strokeLinecap="round"
            strokeMiterlimit="10"
            transform="rotate(45 26 26)"
            x1="26"
            y1="18"
            x2="26"
            y2="34"
            strokeLinejoin="round"
          />
          <line
            data-color="color-2"
            fill="none"
            stroke={this.props.stroke}
            strokeWidth="2"
            strokeLinecap="round"
            strokeMiterlimit="10"
            transform="rotate(45 26 26)"
            x1="34"
            y1="26"
            x2="18"
            y2="26"
            strokeLinejoin="round"
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
