import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import debounce from 'debounce'

import Card from '../Card'
import Search from './Search'
import Product from './Result/Product'
import Pagination from '../Pagination/index'

import Dropdown from '@vtex/styleguide/lib/Dropdown'
import EmptyCollection from './Result/EmptyCollection'
import EmptySearch from './Result/EmptySearch'

class Items extends Component {
  constructor(props) {
    super(props)

    this.state = { query: props.query, selections: { product: {} } }
    this.refetch = debounce(this.refetch.bind(this), 400)
  }

  handleChangeSearch = e => {
    const query = e.target.value
    this.refetch({
      ...this.props.data.variables,
      query: query,
    })
    this.setState({ query })
  };

  refetch(variables) {
    this.props.data.refetch(variables)
  }

  handleChangePage = (page, from, to) => {
    const query = this.state.query

    this.props.data.refetch({
      ...this.props.data.variables,
      ...(query
        ? { queryFrom: from, queryTo: to }
        : { collectionFrom: from, collectionTo: to }),
    })
  };

  handleChangeSelection = changes => {
    this.setState(prevState => {
      const newState = changes.reduce(this.doChange, prevState)
      return newState
    })
  };

  doChange = (prevState, change) => {
    return {
      ...prevState,
      selections: {
        ...prevState.selections,
        product: {
          ...prevState.selections.product,
          [change.productId]: {
            ...(prevState.selections.product[change.productId] || {}),
            skus: {
              ...((prevState.selections.product[change.productId] &&
                prevState.selections.product[change.productId].skus) || {}),
              ...(change.type === 'SKU'
                ? { [change.skuId]: { checked: change.checked } }
                : {}),
            },
          },
        },
      },
    }
  };

  render() {
    return (
      <Card>
        <div className="w-90 center">
          <div className="flex justify-between items-center">
            <div className="f4 fw7">
              Items
            </div>
            <div>
              <Pagination
                pages={
                  this.props.data.loading
                    ? Infinity
                    : this.state.query
                      ? this.props.data.products.paging.pages
                      : this.props.data.collection.paging.pages
                }
                currentPage={
                  this.state.query
                    ? this.props.data.products.paging.page
                    : this.props.data.collection.paging.page
                }
                from={
                  this.state.query
                    ? this.props.data.products.paging._from
                    : this.props.data.collection.paging._from
                }
                to={
                  this.state.query
                    ? this.props.data.products.paging._to
                    : this.props.data.collection.paging._to
                }
                onChange={this.handleChangePage}
              />
            </div>
          </div>
          <div className="flex items-baseline w-100 justify-between">
            <div className="pt6 flex-auto">
              <Search
                value={this.state.query}
                onChange={this.handleChangeSearch}
              />
            </div>
            <div className="pl4">
              <label htmlFor="filter" className="f7 fw3">
                Filter by
              </label>
              <div className="pt3">
                <Dropdown
                  placeholder="All"
                  options={['Selected', 'Not selected', 'All']}
                  onChange={() => {}}
                  value=""
                  id="filter"
                />
              </div>
            </div>
          </div>
          <div className="pt6">
            {this.props.data.loading
              ? <div>Loading</div>
              : this.state.query
                ? this.props.data.products.items.length === 0
                  ? <EmptySearch />
                  : this.props.data.products.items.map(product => (
                    <Product
                      product={product}
                      key={product.productId}
                      onChangeSelection={this.handleChangeSelection}
                      productState={
                        this.state.selections.product[product.productId]
                      }
                      productInCollection={
                        this.props.collectionId &&
                                this.props.data.collection.items.find(
                                  item => item.productId === product.productId
                                )
                      }
                    />
                  ))
                : this.props.collectionId &&
                      this.props.data.collection.items.length > 0
                  ? this.props.data.collection.items.map(product => (
                    <Product
                      product={product}
                      key={product.productId}
                      onChangeSelection={this.handleChangeSelection}
                      productState={
                        this.state.selections.product[product.productId]
                      }
                      productInCollection={this.props.data.collection.items.find(
                        item => item.productId === product.productId
                      )}
                    />
                  ))
                  : <EmptyCollection />}
          </div>
        </div>
      </Card>
    )
  }
}

Items.propTypes = {
  collectionId: PropTypes.string,
  query: PropTypes.string,
  data: PropTypes.object,
}

const query = gql`
  query Products(
    $query: String,
    $queryFrom: Int,
    $queryTo: Int,
    $collectionId: String,
    $collectionFrom: Int,
    $collectionTo: Int,
  ) {
    collection: products(
      collection: $collectionId,
      from: $collectionFrom,
      to: $collectionTo,
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

const options = {
  options: (
    { collectionId, collectionFrom, collectionTo, query, queryFrom, queryTo }
  ) => ({
    variables: {
      collectionId,
      collectionFrom,
      collectionTo,
      query,
      queryFrom,
      queryTo,
    },
  }),
}

const ItemsContainer = graphql(query, options)(Items)

ItemsContainer.defaultProps = {
  collectionFrom: 0,
  collectionTo: 9,
  query: '',
  queryFrom: 0,
  queryTo: 9,
}

export default ItemsContainer
