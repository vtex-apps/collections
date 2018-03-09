import React, { Component } from 'react'
import PropTypes from 'prop-types'
import config from 'vtex-tachyons/config.json'

class EmptySearchIcon extends Component {
  render() {
    return (
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px" y="0px"
        viewBox="0 0 64 64"
        xmlSpace="preserve"
        width="64"
        height="64">
          <g class="nc-icon-wrapper" fill="#368df7">
            <line
              data-cap="butt"
              data-color="color-2"
              fill="none" stroke={this.props.stroke}
              stroke-width="2"
              stroke-miterlimit="10"
              x1="60" y1="60" x2="43" y2="43"
              stroke-linejoin="round"
              stroke-linecap="round">
            </line>
            <circle
              fill="none"
              stroke={this.props.stroke}
              stroke-width="2"
              stroke-linecap="round"
              stroke-miterlimit="10"
              cx="26" cy="26" r="24"
              stroke-linejoin="round">
            </circle>
            <line
              data-color="color-2"
              fill="none"
              stroke={this.props.stroke}
              stroke-width="2"
              stroke-linecap="round"
              stroke-miterlimit="10"
              transform="rotate(45 26 26)"
              x1="26" y1="18" x2="26" y2="34"
              stroke-linejoin="round">
            </line>
            <line
              data-color="color-2"
              fill="none"
              stroke={this.props.stroke}
              stroke-width="2"
              stroke-linecap="round"
              stroke-miterlimit="10"
              transform="rotate(45 26 26)"
              x1="34" y1="26" x2="18" y2="26"
              stroke-linejoin="round">
            </line>
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
