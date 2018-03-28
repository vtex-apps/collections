import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Downshift from 'downshift'
import AutocompleteInput from './AutocompleteInput'

class Autocomplete extends Component {
  constructor(props) {
    super(props)

    this.state = { value: '', isMenuOpen: false }
  }

  handleChangeValue = e => {
    const value = e.target.value
    this.setState({ value, isMenuOpen: value.length >= 3 })
  };

  handleOuterClick = () => {
    this.setState({ isMenuOpen: false })
  };

  handleKeyDown = e => {
    const { values } = this.props
    if (
      values.length && this.state.value.length === 0 && e.key === 'Backspace'
    ) {
      this.props.onChange(values.slice(0, values.length - 1))
    }
  };

  handleChange = item => {
    this.setState({ value: '', isMenuOpen: false })
    this.props.onChange([...this.props.values, parseInt(item)])
  };

  render() {
    const { DataSource, values, data: { loading, names } } = this.props

    if (loading) return null

    return (
      <Downshift
        selectedItem={values}
        inputValue={this.state.value}
        onChange={this.handleChange}
        onOuterClick={this.handleOuterClick}
        isOpen={this.state.isMenuOpen}
        render={(
          {
            getInputProps,
            getItemProps,
            inputValue,
            selectedItem,
            highlightedIndex,
            isOpen,
          }
        ) => (
          <div className="relative">
            <AutocompleteInput
              {...getInputProps({
                id: 'autocomplete-category',
                value: this.state.value,
                onChange: this.handleChangeValue,
                onKeyDown: this.handleKeyDown,
              })}
              block
              open={isOpen}
              values={names}
            />
            {isOpen
              ? <DataSource
                {...{
                  values,
                  inputValue,
                  getItemProps,
                  selectedItem,
                  highlightedIndex,
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
  data: PropTypes.object,
  DataSource: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Autocomplete
