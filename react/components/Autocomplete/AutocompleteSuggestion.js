import React, { Component } from 'react'
import PropTypes from 'prop-types'

class AutocompleteSuggestion extends Component {
  render() {
    const { data: { suggestions = [], loading } } = this.props
    const { highlightedIndex, getItemProps } = this.props

    const optionsClasses = 'absolute bl br bb bw1 br2 br--bottom bg-white flex-column z-max overflow-y-auto b--light-gray '
    const optionClasses = 'w-100 pointer flex near-black tl bb-0 bl-0 br-0 bt b--near-white b--silver pv4 ph3 '

    return (
      <div className={optionsClasses} style={{ width: '100%' }}>
        {loading
          ? <div className={`${optionClasses} i-s`}>Loading...</div>
          : suggestions.length === 0
            ? <div className={optionClasses}>
                  No results for "{this.props.inputValue}".
            </div>
            : suggestions.map((suggestion, index) => {
              const isActive = highlightedIndex === index
              const selected = this.props.values.find(
                c => parseInt(suggestion.id) === c
              )

              const props = selected
                ? {}
                : getItemProps({
                  index,
                  item: suggestion.id,
                })

              return (
                <div
                  key={suggestion.id}
                  {...props}
                  className={
                    `${optionClasses} ${isActive ? 'bg-near-white' : 'bg-white'} ${selected ? 'fwb' : ''}`
                  }
                >
                  {selected && 'OK - '}{suggestion.name}
                </div>
              )
            })}
      </div>
    )
  }
}

AutocompleteSuggestion.propTypes = {
  values: PropTypes.array,
  data: PropTypes.object,
  inputValue: PropTypes.string,
  selectedItem: PropTypes.any,
  highlightedIndex: PropTypes.number,
  getItemProps: PropTypes.func,
}

export default AutocompleteSuggestion
