import React, { Component } from 'react'
import PropTypes from 'prop-types'
import config from 'vtex-tachyons/config.json'

class IconArrowUp extends Component {
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
            points="12,11.4 8,7.4 4,11.4 2.6,10 8,4.6 13.4,10 "
          />
        </g>
      </svg>
    )
  }
}

IconArrowUp.defaultProps = {
  fill: config.colors.blue,
}

IconArrowUp.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
}

export default IconArrowUp
