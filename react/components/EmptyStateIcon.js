import React, { Component } from 'react'
import PropTypes from 'prop-types'
import config from 'vtex-tachyons/config.json'

class EmptyStateIcon extends Component {
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
        height="64">
          <g class="nc-icon-wrapper" fill="#368df7">
            <polyline data-cap="butt"
              fill="none" stroke={this.props.stroke}
              stroke-width="2"
              stroke-miterlimit="10"
              points="48,18 48,11 24,11 18,5 2,5 2,59 49,59 61,23 14,23 2,59 "
              transform="translate(0, 0)"
              stroke-linejoin="round"
              stroke-linecap="round">
            </polyline>
          </g>
      </svg>
    )
  }
}

EmptyStateIcon.defaultProps = {
  stroke: config.colors['rebel-pink'],
}

EmptyStateIcon.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
}

export default EmptyStateIcon
