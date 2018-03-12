import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose, graphql } from 'react-apollo'
import gql from 'graphql-tag'
import debounce from 'debounce'
import reduce from 'lodash/reduce'

import Button from '@vtex/styleguide/lib/Button'
import Config from './components/Config'
import Items from './components/Items'

class Collection extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchQuery: props.searchQuery,
      selections: { product: {} },
    }
    this.productsRefetch = debounce(this.productsRefetch.bind(this), 400)
  }

  handleChangeSearch = e => {
    const searchQuery = e.target.value
    this.productsRefetch({
      ...this.props.products.variables,
      searchQuery: searchQuery,
    })
    this.setState({ searchQuery })
  };

  productsRefetch(variables) {
    this.props.products.refetch(variables)
  }

  handleChangePage = (page, from, to) => {
    this.props.products.refetch({
      ...this.props.products.variables,
      ...(this.state.searchQuery
        ? { queryFrom: from, queryTo: to }
        : { collectionFrom: from, collectionTo: to }),
    })
  };

  handleChangeSelection = changes => {
    this.setState(prevState => changes.reduce(this.doChange, prevState))
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

  save = () => {
    this.props
      .saveCollection({
        variables: {
          name: 'teste 1',
          searchable: false,
          highlight: false,
          dateFrom: '2018-01-26T10:57:00',
          dateTo: '2018-01-26T10:57:00',
          conditions: [
            {
              name: 'Foobar I',
              type: 'I',
              preSale: false,
              release: false,
              brands: [],
              categories: [],
              skus: reduce(
                this.state.selections.product,
                (acc, product) => {
                  return acc.concat(
                    reduce(product.skus, (acc, _, skuId) => acc.concat(skuId), [
                    ])
                  )
                },
                []
              ),
            },
          ],
        },
      })
      .then(() => {
        this.props.collectionData.refetch()
      })
  };

  handleChangeHighlight = () => {
    this.setState({ highlight: !this.state.highlight })
  };

  handleChangeSearchable = () => {
    this.setState({ searchable: !this.state.searchable })
  };

  handleChangeName = e => {
    this.setState({ name: e.target.value })
  };

  handleCancel() {
    window.location.href = '/admin/collections'
  }

  handleSave = () => {
    this.save()
  };

  render() {
    return (
      <div className="pv8 ph3 near-black bg-near-white w-100 h-100">
        <div className="w-90 center">
          <div
            className="flex justify-between items-center bb b--light-gray pb6"
          >
            <div className="fw7 f2">
              Collections
            </div>
            <div>
              <div className="pr5 dib">
                <Button onClick={this.handleCancel}>
                  cancel
                </Button>
              </div>
              <Button primary onClick={this.handleSave}>
                save
              </Button>
            </div>
          </div>

          <div>
            {this.props.collectionData.loading
              ? null
              : <Config collection={this.props.collectionData.collection} />}
            <Items
              loading={
                this.props.products.loading || this.props.collectionData.loading
              }
              selectedSkus={
                (!this.props.collectionData.loading &&
                  this.props.collectionData.collection &&
                  this.props.collectionData.collection.conditions &&
                  this.props.collectionData.collection.conditions.items &&
                  this.props.collectionData.collection.conditions.items.reduce(
                    (items, condition) =>
                      items.concat(
                        condition.skus.reduce((ids, sku) => ids.concat(sku), [])
                      ),
                    []
                  )) || []
              }
              selections={this.state.selections}
              query={this.state.searchQuery}
              queryFrom={this.props.products.variables.queryFrom}
              queryTo={this.props.products.variables.queryTo}
              collectionFrom={this.props.products.variables.collectionFrom}
              collectionTo={this.props.products.variables.collectionTo}
              productsCollection={this.props.products.collection}
              productsSearch={this.props.products.search}
              onChangeSelection={this.handleChangeSelection}
              onChangePage={this.handleChangePage}
              onChangeSearch={this.handleChangeSearch}
            />
          </div>
        </div>
      </div>
    )
  }
}

Collection.propTypes = {
  searchQuery: PropTypes.string,
  collectionData: PropTypes.object,
  products: PropTypes.object,
  params: PropTypes.object.isRequired,
  saveCollection: PropTypes.func.isRequired,
}

const collectionMutation = gql`
  mutation collection(
    $name: String
    $searchable: Boolean
    $highlight: Boolean
    $dateFrom: String
    $dateTo: String
    $conditions: [ConditionInput]
  ) {
    collection(
      name: $name
      searchable: $searchable
      highlight: $highlight
      dateFrom: $dateFrom
      dateTo: $dateTo
      conditions: $conditions
    )
  }
`

const collectionQuery = gql`
  query Collection(
    $id: Int,
    $page: Int,
    $pageSize: Int,
  ) {
    collection(
      id: $id,
      page: $page,
      pageSize: $pageSize,
    ) {
      id
      name
      searchable
      highlight
      dateFrom
      dateTo
      conditions {
        paging {
          page
          perPage
          total
          pages
        }
        items {
          id
          name
          type
          preSale
          release
          brands
          categories
          skus
          products
        }
      }
    }
  }
`

const collectionProducts = gql`
  query Products(
    $searchQuery: String,
    $queryFrom: Int,
    $queryTo: Int,
    $ids: [Int],
    $collectionFrom: Int,
    $collectionTo: Int,
  ) {
    collection: skus(
      ids: $ids,
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
    search: products(
      query: $searchQuery,
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

const CollectionContainer = compose(
  graphql(collectionQuery, {
    name: 'collectionData',
    options({ params }) {
      return {
        variables: {
          id: parseInt(params.id, 10),
          page: 1,
          pageSize: 10,
        },
      }
    },
  }),
  graphql(collectionProducts, {
    name: 'products',
    options(
      {
        collectionData,
        collectionFrom,
        collectionTo,
        searchQuery = '',
        queryFrom,
        queryTo,
      }
    ) {
      return {
        variables: {
          ids: collectionData && collectionData.collection
            ? collectionData.collection.conditions.items
              .slice(collectionFrom, collectionTo)
              .reduce(
                (items, condition) =>
                  items.concat(
                    condition.skus.reduce((ids, sku) => ids.concat(sku), [])
                  ),
                []
              )
            : [],
          collectionFrom,
          collectionTo,
          searchQuery,
          queryFrom,
          queryTo,
        },
      }
    },
  }),
  graphql(collectionMutation, { name: 'saveCollection' })
)(Collection)

CollectionContainer.defaultProps = {
  collectionFrom: 0,
  collectionTo: 9,
  searchQuery: '',
  queryFrom: 0,
  queryTo: 9,
}

export default CollectionContainer
