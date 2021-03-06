import React, { Component } from 'react'
import PropTypes from 'prop-types'
import config from 'vtex-tachyons/config.json'

class AddIcon extends Component {
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
        <g className="nc-icon-wrapper" fill={this.props.color}>
          <circle
            fill="none"
            stroke={this.props.color}
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
            stroke={this.props.color}
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
            stroke={this.props.color}
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

AddIcon.defaultProps = {
  color: config.colors.blue,
}

AddIcon.propTypes = {
  color: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
}

export default AddIcon
