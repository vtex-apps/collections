import React, { Component } from 'react'
import PropTypes from 'prop-types'
import config from 'vtex-tachyons/config.json'

class IconArrowDown extends Component {
  render() {
    return (
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 16 16"
        xmlSpace="preserve"
        width={this.props.width}
        height={this.props.height}
      >
        <g className="nc-icon-wrapper" fill="#368df7">
          <polygon
            fill={this.props.fill}
            points="8,11.4 2.6,6 4,4.6 8,8.6 12,4.6 13.4,6 "
          />
        </g>
      </svg>
    )
  }
}

IconArrowDown.defaultProps = {
  fill: config.colors.blue,
}

IconArrowDown.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
}

export default IconArrowDown
