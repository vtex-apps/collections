import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AutocompleteSuggestion from './AutocompleteSuggestion'
import Autocomplete from './Autocomplete'

function createAutocomplete({ graphql: { suggestion, name } }) {
  const AutocompleteSugestionContainer = suggestion(AutocompleteSuggestion)
  const AutocompleteContainer = name(Autocomplete)

  class AutocompleteWrapper extends Component {
    render() {
      return (
        <AutocompleteContainer
          values={this.props.values}
          DataSource={AutocompleteSugestionContainer}
          onChange={this.props.onChange}
        />
      )
    }
  }

  AutocompleteWrapper.propTypes = {
    values: PropTypes.array,
    onChange: PropTypes.func,
  }

  return AutocompleteWrapper
}

export default createAutocomplete
