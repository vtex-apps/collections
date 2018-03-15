import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import Search from './Search'
import Result from './Result/index'
import Pagination from '../../Pagination/index'

import EmptyCollection from '../../EmptyStates/EmptyCollection'
import EmptySearch from '../../EmptyStates/EmptySearch'
import Loading from '../../Loading'

class Items extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentPage: 1,
      queryFrom: 0,
      queryTo: 9,
      query: '',
    }
  }

  getCurrentPage() {
    return this.hasData()
      ? this.state.query
        ? this.props.search.products.paging.pages
        : Math.ceil(this.state.queryFrom / 10) + 1
      : 1
  }

  getPages() {
    return this.hasData()
      ? this.state.query
        ? this.props.search.products.paging.pages
        : Math.ceil(this.props.skus.length / 10)
      : Infinity
  }

  getFrom() {
    return this.hasData()
      ? this.state.query
        ? this.props.search.products.paging._from
        : this.state.queryFrom
      : null
  }

  getTo() {
    return this.hasData()
      ? this.state.query
        ? this.props.search.products.paging._to
        : this.state.queryTo
      : null
  }

  hasData() {
    return (this.state.query && !this.props.search.loading) ||
      (!this.state.query && !this.props.collection.loading)
  }

  handleChangeSearch = e => {
    const query = e.target.value
    const newState = { query, queryFrom: 0, queryTo: 9 }

    this.props.search.refetch(newState)
    this.setState(newState)
  };

  handleChangePage = (page, from, to) => {
    if (this.state.query) {
      this.props.search.refetch({
        query: this.state.query,
        queryFrom: from,
        queryTo: to,
      })
    } else {
      this.props.collection.refetch({
        ids: this.props.skus.slice(from, to),
        queryFrom: from,
        queryTo: to,
      })
    }

    this.setState({ currentPage: page, queryFrom: from, queryTo: to })
  };

  render() {
    return (
      <div>
        <div className="flex items-end w-100 justify-between pt6">
          <div className="flex-auto">
            <Search
              value={this.state.query}
              onChange={this.handleChangeSearch}
            />
          </div>
          <div className="ml4">
            <Pagination
              pages={this.getPages()}
              from={this.getFrom()}
              to={this.getTo()}
              currentPage={this.getCurrentPage()}
              onChange={this.handleChangePage}
            />
          </div>
        </div>
        <div className="pt6">
          {this.state.query
            ? this.props.search.loading
              ? <div className="flex flex-column items-center pa10">
                <Loading />
              </div>
              : this.props.search.products.items.length === 0
                ? <EmptySearch />
                : <Result
                  isSearch
                  products={this.props.search.products.items}
                  selectedSkus={[]}
                  selectionState={this.props.selections}
                  onChangeSelection={this.props.onChangeSelection}
                />
            : this.props.collection.loading
              ? <div className="flex flex-column items-center pa10">
                <Loading />
              </div>
              : this.props.collection.products.items.length === 0
                ? <EmptyCollection />
                : <Result
                  isCollection
                  products={this.props.collection.products.items}
                  selectedSkus={this.props.skus.map(skuId => ({
                    id: parseInt(skuId),
                    contains: true,
                  }))}
                  selectionState={this.props.selections}
                  onChangeSelection={this.props.onChangeSelection}
                />}
        </div>
      </div>
    )
  }
}

const collection = gql`
  query Products(
    $ids: [Int],
  ) {
    products: skus(
      ids: $ids,
      from: 0,
      to: 9,
    ) {
      items {
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
  }
`
const search = gql`
  query Products(
    $query: String,
    $queryFrom: Int,
    $queryTo: Int,
  ) {
    products: products(
      query: $query,
      from: $queryFrom,
      to: $queryTo,
    ) {
      items {
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
      paging {
        pages
        perPage
        total
        page
        _to
        _from
      }
    }
  }
`

const contains = gql`
  query Products(
    $collectionId: Int
    $skus: [SkuContainsInput]
  ) {
    collectionContains(
      collectionId: $collectionId
      skus: $skus
    ) {
      skus {
        id
        contains
      }
    }
  }
`

Items.propTypes = {
  skus: PropTypes.array.isRequired,
  selections: PropTypes.object,
  query: PropTypes.string,
  contains: PropTypes.object,
  search: PropTypes.object,
  collection: PropTypes.object,
  onChangeSelection: PropTypes.func.isRequired,
}

const ItemsContainer = compose(
  graphql(search, {
    name: 'search',
    options(
      {
        query = '',
        queryFrom = 0,
        queryTo = 9,
      }
    ) {
      return {
        variables: {
          query,
          queryFrom,
          queryTo,
        },
      }
    },
  }),
  graphql(contains, {
    name: 'contains',
    options({ collectionId, search }) {
      return {
        variables: {
          collectionId,
          skus: search.loading
            ? []
            : search.products.items.reduce(
              (acc, product) =>
                product.items.reduce(
                  (skuIds, sku) =>
                    skuIds.concat({ id: parseInt(sku.itemId) }),
                  acc
                ),
              []
            ),
        },
      }
    },
  }),
  graphql(collection, {
    name: 'collection',
    options({ skus = [], queryFrom, queryTo }) {
      return {
        variables: {
          ids: skus.slice(queryFrom, queryTo),
        },
      }
    },
  })
)(Items)

ItemsContainer.defaultProps = {
  query: '',
}

export default ItemsContainer
