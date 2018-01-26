import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

class Shelf extends Component {
  render() {
    const { data } = this.props

    return (
      <div>
        {data.loading
          ? <FormattedMessage id="store-graphql.loading" />
          : <pre>{JSON.stringify(data.collections, null, 2)}</pre>
        }
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
