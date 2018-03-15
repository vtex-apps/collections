import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Downshift from 'downshift'

class Autocomplete extends Component {
  constructor(props) {
    super(props)

    this.state = { value: '' }
  }

  handleChangeValue = e => {
    const value = e.target.value
    this.setState({ value })
  };

  handleChange = item => {
    this.setState({ value: '' })
    this.props.onChange([...this.props.values, item])
  };

  render() {
    const { DataSource, values, onChange } = this.props

    return (
      <Downshift
        selectedItem={values}
        inputValue={this.state.value}
        onChange={onChange}
        render={(
          {
            getInputProps,
            getItemProps,
            isOpen,
            inputValue,
            selectedItem,
            highlightedIndex,
          }
        ) => (
          <div>
            <input {...getInputProps()} onChange={this.handleChangeValue} />
            {isOpen
              ? <DataSource
                {...{
                  inputValue,
                  getItemProps,
                  selectedItem,
                  highlightedIndex,
                  isOpen,
                }}
              />
              : null}
          </div>
        )}
      />
    )
  }
}

Autocomplete.propTypes = {
  values: PropTypes.array,
  DataSource: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Autocomplete
