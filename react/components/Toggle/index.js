import React, { Component } from 'react'
import PropTypes from 'prop-types'

import config from 'vtex-tachyons/config.json'

const noop = () => {}

class Toggle extends Component {
  render() {
    const { semantic, disabled, id, checked } = this.props

    let classes = 'flex items-center relative h1 w2 ph1 br4 bg-animate '
    let circleClasses = 'absolute br-100 pa3 '

    // Background
    if (semantic) {
      if (!disabled && !checked) {
        classes += 'bg-red '
      }

      if (!disabled && checked) {
        classes += 'bg-green '
      }
    } else if (disabled) {
      classes += 'bg-near-white '
    } else {
      if (!checked) {
        classes += 'bg-gray '
      }

      if (checked) {
        classes += 'bg-blue '
      }
    }

    // Circle
    if (checked) {
      circleClasses += 'left-1 '
    } else {
      circleClasses += 'left-0 '
    }

    if (disabled) {
      circleClasses += 'bg-light-gray '
    } else {
      circleClasses += 'bg-white '
    }

    const eventHandlers = {
      onClick: this.props.onClick ? this.props.onClick : noop,
      onChange: this.props.onChange ? this.props.onChange : noop,
    }

    return (
      <label
        htmlFor={`${id}`}
        className={`flex flex-row items-center ${!disabled && 'pointer'}`}
      >
        {this.props.children ? this.props.children : ''}
        <div className={`${classes}`}>
          <div
            style={{
              height: '0.8rem',
              width: '0.8rem',
              transition: 'all .2s ease-out',
              boxShadow: disabled ? 'none' : '0 0 10px rgba(0,0,0,0.2)',
            }}
            className={`${circleClasses}`}
          />
        </div>
        <input
          id={`${id}`}
          type="checkbox"
          className="dn"
          disabled={disabled}
          checked={checked}
          {...eventHandlers}
        />
      </label>
    )
  }
}

Toggle.defaultProps = {
  checked: false,
  disabled: false,
  semantic: false,
}

Toggle.propTypes = {
  checked: PropTypes.bool,
  semantic: PropTypes.bool,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  children: PropTypes.node,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
}

export default Toggle
