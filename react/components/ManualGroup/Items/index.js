import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql, compose } from 'react-apollo'

import SearchProducts from './SearchProducts.gql'
import SearchCollectionSkus from './SearchCollectionSkus.gql'
import CollectionContains from './CollectionContains.gql'

import Search from './Search'
import Result from './Result/index'
import Pagination from '../../Pagination/index'

import EmptyCollection from '../../EmptyStates/EmptyCollection'
import EmptySearch from '../../EmptyStates/EmptySearch'
import Loading from '../../Loading'

class Items extends Component {
  getCurrentPage() {
    return this.hasData()
      ? this.props.query
        ? this.props.search.products.paging.pages
        : Math.ceil(this.props.queryFrom / 10) + 1
      : 1
  }

  getPages() {
    return this.hasData()
      ? this.props.query
        ? this.props.search.products.paging.pages
        : Math.ceil(this.props.skus.length / 10) === 0
          ? 1
          : Math.ceil(this.props.skus.length / 10)
      : Infinity
  }

  getFrom() {
    return this.hasData()
      ? this.props.query
        ? this.props.search.products.paging._from
        : this.props.queryFrom
      : null
  }

  getTo() {
    return this.hasData()
      ? this.props.query
        ? this.props.search.products.paging._to
        : this.props.queryTo
      : null
  }

  hasData() {
    return (this.props.query && !this.props.search.loading) ||
      (!this.props.query && !this.props.collection.loading)
  }

  handleChangeSearch = e => {
    const query = e.target.value
    const newState = { query, queryFrom: 0, queryTo: 9 }
    this.props.onChange(newState)
  };

  handleChangePage = (page, from, to) => {
    this.props.onChange({ currentPage: page, queryFrom: from, queryTo: to })
  };

  render() {
    return (
      <div>
        <div className="flex items-end w-100 justify-between pt6">
          <div className="flex-auto">
            <Search
              value={this.props.query}
              placeholder="Search by product or sku name…"
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
          {this.props.query
            ? this.props.search.loading
              ? <div className="flex flex-column items-center pa10">
                <Loading />
              </div>
              : this.props.search.products.items.length === 0
                ? <EmptySearch />
                : <Result
                  isSearch
                  products={this.props.search.products.items}
                  selectedSkus={this.props.skus}
                  onChange={this.props.onChangeSkus}
                />
            : this.props.collection.loading
              ? <div className="flex flex-column items-center pa10">
                <Loading />
              </div>
              : this.props.skus.length === 0
                ? <EmptyCollection />
                : <Result
                  isCollection
                  products={this.props.collection.products.items}
                  selectedSkus={this.props.skus}
                  onChange={this.props.onChangeSkus}
                />}
        </div>
      </div>
    )
  }
}

Items.defaultProps = {
  skus: [],
}

Items.propTypes = {
  currentPage: PropTypes.number.isRequired,
  query: PropTypes.string,
  queryFrom: PropTypes.number.isRequired,
  queryTo: PropTypes.number.isRequired,
  collection: PropTypes.object,
  skus: PropTypes.array.isRequired,
  contains: PropTypes.object,
  search: PropTypes.object,
  onChangeSkus: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
}

const ItemsContainer = compose(
  graphql(SearchProducts, {
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
  graphql(CollectionContains, {
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
  graphql(SearchCollectionSkus, {
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

export default ItemsContainer
