import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RcTimePicker from 'rc-time-picker'
import moment from 'moment'

class TimePicker extends Component {
  constructor(props) {
    super(props)

    this.state = {
      focused: false,
      value: moment(props.value || new Date()),
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: moment(nextProps.value || new Date()),
    })
  }

  handleChange = date => {
    this.props.onChange(date.toISOString())
  };

  render() {
    return (
      <RcTimePicker
        showSecond={false}
        minuteStep={10}
        value={this.state.value}
        onChange={this.handleChange}
      />
    )
  }
}

TimePicker.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

export default TimePicker
