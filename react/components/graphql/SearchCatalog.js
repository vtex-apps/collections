import { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'

class SearchCatalog extends Component {
  render() {
    return this.props.children({
      loading: this.props.data.loading,
      products: this.props.data.products,
    })
  }
}

SearchCatalog.defaultProps = {
  orderBy: 'OrderByPriceDESC',
}

SearchCatalog.propTypes = {
  query: PropTypes.string,
  category: PropTypes.string,
  specificationFilters: PropTypes.arrayOf(PropTypes.string),
  priceRange: PropTypes.string,
  collection: PropTypes.string,
  salesChannel: PropTypes.string,
  orderBy: PropTypes.string,
  from: PropTypes.number,
  to: PropTypes.number,
  children: PropTypes.func.isRequired,
  data: PropTypes.object,
}

const query = gql`
  query Products(
    $query: String,
    $category: String,
    $specificationFilters: [String],
    $priceRange: String,
    $collection: String,
    $salesChannel: String,
    $orderBy: String,
    $from: Int,
    $to: Int,
  ) {
    products(
      query: $query,
      category: $category,
      specificationFilters: $specificationFilters,
      priceRange: $priceRange,
      collection: $collection,
      salesChannel: $salesChannel,
      orderBy: $orderBy,
      from: $from,
      to: $to,
    ) {
      productId
      productName
      productReference
      items {
        images {
          imageUrl
        }
        itemId
        name
        nameComplete
        complementName
        referenceId {
          Key
          Value
        }
      }
    }
  }
`

const options = {
  options: (
    {
      query,
      category,
      specificationFilters = [],
      priceRange,
      collection,
      salesChannel,
      orderBy,
      from = 0,
      to = 10,
    }
  ) => ({
    variables: {
      query,
      category,
      specificationFilters,
      priceRange,
      collection,
      salesChannel,
      orderBy,
      from,
      to,
    },
  }),
}

export default graphql(query, options)(SearchCatalog)
