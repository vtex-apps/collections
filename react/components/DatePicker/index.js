import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { SingleDatePicker } from 'react-dates'

class DatePicker extends Component {
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

  handleFocusChange = ({ focused }) => {
    this.setState({ focused })
  };

  handleChange = date => {
    this.props.onChange(date.toISOString())
  };

  render() {
    return (
      <SingleDatePicker
        showDefaultInputIcon
        numberOfMonths={1}
        date={this.state.value}
        focused={this.state.focused}
        onDateChange={this.handleChange}
        onFocusChange={this.handleFocusChange}
      />
    )
  }
}

DatePicker.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

export default DatePicker
