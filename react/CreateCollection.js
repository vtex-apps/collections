import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

class Shelf extends Component {
  render() {
    const { data } = this.props

    return (
      <div className="bg-gray">
        <div className="pa4 w-50-l center">
          <div className="fw7 f2">
            New collection
          </div>
          <label for="name">Collection name</label>
          <input id="name" className="w-100"></input>
        </div>
      </div>
    )
  }
}

Shelf.propTypes = {
  data: PropTypes.object.isRequired,
}

const query = gql`
  {
    collections {
      Page,
      Size,
      TotalRows,
      TotalPage,
      Data {
        Id,
        Name,
        Searchable,
        Highlight,
        DateFrom,
        DateTo,
      }
    }
  }
`

const options = {
  options: ({ page = 1, size = 20 }) => ({
    variables: {
      page,
      size,
    },
  }),
}

export default graphql(query, options)(Shelf)
