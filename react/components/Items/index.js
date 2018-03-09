import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import debounce from 'debounce'

import Card from '../Card'
import Search from './Search'
import Result from './Result/index'
import Pagination from '../Pagination/index'

import Dropdown from '@vtex/styleguide/lib/Dropdown'
import EmptyCollection from './Result/EmptyCollection'
import EmptySearch from './Result/EmptySearch'

class Items extends Component {
  constructor(props) {
    super(props)

    this.state = { query: props.query }
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
                  ? <div>Empty</div>
                  : <Result
                    products={this.props.data.products.items}
                    collection={this.props.data.collection.items}
                  />
                : this.props.data.collection.items.length === 0
                  ? <EmptyCollection />
                  : <Result
                    products={this.props.data.collection.items}
                    collection={this.props.data.collection.items}
                  />}
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
