import { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'

class SearchCollections extends Component {
  render() {
    return this.props.children({
      loading: this.props.data.loading,
      collections: this.props.data.collections,
    })
  }
}

SearchCollections.propTypes = {
  searchKey: PropTypes.string,
  page: PropTypes.number,
  pageSize: PropTypes.number,
  children: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
}

const query = gql`
  query Collections(
    $searchKey: String
    $page: Int
    $pageSize: Int
  ) {
    collections(
      searchKey: $searchKey
      page: $page
      pageSize: $pageSize
    ) {
      paging {
        page
        perPage
        total
        pages
      }
      items {
        id,
        name,
        searchable,
        highlight,
        dateFrom,
        dateTo,
      }
    }
  }
`

const options = {
  options: ({ searchKey = '', page = 1, pageSize = 20 }) => ({
    variables: {
      searchKey,
      page,
      pageSize,
    },
  }),
}

export default graphql(query, options)(SearchCollections)
