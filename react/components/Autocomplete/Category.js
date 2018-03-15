import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class AutocompleteCategory extends Component {
  render() {
    const { data: { categories = [], loading } } = this.props
    const { selectedItem, highlightedIndex, isOpen, getItemProps } = this.props

    if (loading) {
      return <div>Loading...</div>
    }

    return (
      <div>
        {categories.map(({ name: item }, index) => (
          <div
            key={item}
            {...getItemProps({
              item,
              style: {
                backgroundColor: highlightedIndex === index ? 'gray' : 'white',
                fontWeight: selectedItem === item ? 'bold' : 'normal',
              },
            })}
          >
            {item}
          </div>
        ))}
      </div>
    )
  }
}

AutocompleteCategory.propTypes = {
  data: PropTypes.object,
  inputValue: PropTypes.string,
  selectedItem: PropTypes.any,
  highlightedIndex: PropTypes.number,
  isOpen: PropTypes.bool.isRequired,
  getItemProps: PropTypes.func,
}

const categories = gql`
  query categories($name: String!) {
    categoriesAutocomplete(name: $name) {
      id,
      name
    }
  }
`

export default graphql(categories, {
  options({ inputValue = '' }) {
    return {
      variables: {
        name: inputValue,
      },
    }
  },
})(AutocompleteCategory)
