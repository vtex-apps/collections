import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from './style.css'

class Checkbox extends Component {
  render() {
    return (
      <label className={style.container}>
        <input
          type="checkbox"
          checked={this.props.checked}
          onChange={this.props.onChange}
        />
        <span
          className={
            `${style.checkmark} ba bw1 ${this.props.semiChecked ? 'b--blue' : 'b--light-gray'}`
          }
          style={{ width: '12px', height: '12px' }}
        />
      </label>
    )
  }
}

Checkbox.propTypes = {
  id: PropTypes.string,
  checked: PropTypes.bool,
  semiChecked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
}

export default Checkbox
