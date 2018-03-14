import React, { Component } from 'react'
import PropTypes from 'prop-types'
import config from 'vtex-tachyons/config.json'
import style from './style.css'

class Loading extends Component {
  render() {
    return (
      <svg
        className={style.spinner}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 64 64"
        xmlSpace="preserve"
        width={this.props.width}
        height={this.props.height}
      >
        <g fill={this.props.fill}>
          <g transform="rotate(43.102857129914426 32 32)">
            <path
              className={style.path}
              opacity="0.4"
              fill={this.props.fill}
              d="M32,64C14.35498,64,0,49.64453,0,32C0,14.35498,14.35498,0,32,0s32,14.35498,32,32 C64,49.64453,49.64502,64,32,64z M32,6C17.66357,6,6,17.66357,6,32c0,14.33691,11.66357,26,26,26s26-11.66309,26-26 C58,17.66357,46.33643,6,32,6z"
            />
            <path
              className={style.path}
              data-color="color-2"
              fill={this.props.fill}
              d="M64,32h-6C58,17.66357,46.33643,6,32,6V0C49.64502,0,64,14.35498,64,32z"
            />
          </g>
        </g>
      </svg>
    )
  }
}

Loading.defaultProps = {
  fill: config.colors.blue,
  width: 64,
  height: 64,
}

Loading.propTypes = {
  fill: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
}

export default Loading
