import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RcTimePicker from 'rc-time-picker'
import moment from 'moment'

class TimePicker extends Component {
  constructor(props) {
    super(props)

    this.state = {
      focused: false,
      value: props.value
        ? moment(moment.utc(props.value).local().format())
        : moment(),
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value
        ? moment(moment.utc(nextProps.value).local().format())
        : moment(),
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
