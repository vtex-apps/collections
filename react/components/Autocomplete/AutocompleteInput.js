import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Badge from './Badge'

class AutocompleteInput extends Component {
  constructor(props) {
    super(props)

    this.state = {
      active: false,
    }
  }

  handleFocus = event => {
    this.setState({ active: true })
    this.props.onFocus && this.props.onFocus(event)
  };

  handleBlur = event => {
    this.setState({ active: false })
    this.props.onBlur && this.props.onBlur(event)
  };

  render() {
    const {
      error,
      block,
      large,
      xLarge,
      short,
      long,
      token,
      disabled,
      open,
    } = this.props
    const { active } = this.state

    const size = 'w-100'
    const box = 'ma0 border-box'
    const border = `bw1 br2 ${open ? 'br--top bb-0' : ''}  b--solid outline-0`
    const typography = 'near-black'
    let classes = `${size} ${box} ${border} ${typography} `

    if (token) {
      classes += 'code '
    }

    if (active) {
      classes += 'b--gray '
    } else {
      classes += 'b--light-gray '
      if (!disabled) {
        classes += 'hover-b--silver '
      }
    }

    if (error) {
      classes += 'b--red hover-b--red '
    }

    if (disabled) {
      classes += 'bg-light-gray bg-light-silver b--light-silver silver '
    } else {
      classes += 'bg-white '
    }

    let width = '100%'

    if (large) {
      classes += 'f5 pv4 ph6 '
      // iconSize = 18
      if (!block) {
        if (short) {
          width = '130px'
        } else if (long) {
          width = '420px'
        } else {
          width = '250px'
        }
      }
    } else if (xLarge) {
      classes += 'f4 pv5 ph7 '
      // iconSize = 22
      if (!block) {
        if (short) {
          width = '180px'
        } else if (long) {
          width = '520px'
        } else {
          width = '320px'
        }
      }
    } else {
      classes += 'f6 pv3 ph5 '
      // iconSize = 16
      if (!block) {
        if (short) {
          width = '110px'
        } else if (long) {
          width = '350px'
        } else {
          width = '200px'
        }
      }
    }

    const style = { width: width }

    return (
      <div style={style} className={classes}>
        {this.props.values.map(value => (
          <Badge key={value.id}>{value.name}</Badge>
        ))}
        <input
          className="ml3 bw0 dib outline-transparent"
          disabled={this.props.disabled}
          id={this.props.id}
          name={this.props.name}
          placeholder={this.props.placeholder}
          tabIndex={this.props.tabIndex}
          type={this.props.type}
          value={this.props.value}
          onBlur={this.handleBlur}
          onChange={this.props.onChange}
          onFocus={this.handleFocus}
          onKeyDown={this.props.onKeyDown}
        />
      </div>
    )
  }
}

AutocompleteInput.defaultProps = {
  type: 'text',
}

AutocompleteInput.propTypes = {
  disabled: PropTypes.bool,
  id: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  tabIndex: PropTypes.number,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,

  values: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any,
      name: PropTypes.string,
    })
  ),

  block: PropTypes.bool,
  error: PropTypes.bool,
  large: PropTypes.bool,
  long: PropTypes.bool,
  open: PropTypes.bool.isRequired,
  short: PropTypes.bool,
  token: PropTypes.bool,
  xLarge: PropTypes.bool,

  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
}

export default AutocompleteInput
