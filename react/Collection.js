import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose, graphql } from 'react-apollo'
import gql from 'graphql-tag'
import debounce from 'debounce'
import reduce from 'lodash/reduce'

import Button from '@vtex/styleguide/lib/Button'
import Config from './components/Config'
import Items from './components/Items'
import NewGroup from './components/NewGroup'
import DynamicGroup from './components/DynamicGroup'
import CollapsedGroup from './components/CollapsedGroup'
import withNavigate from './components/withNavigate'
import Alert from '@vtex/styleguide/lib/Alert';

class Collection extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentPage: 1,
      searchQuery: props.searchQuery,
      selections: { product: {} },
      config: this.mapCollectionConfig(props),
    }
    this.productsRefetch = debounce(this.productsRefetch.bind(this), 400)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      config: this.mapCollectionConfig(nextProps),
    })
  }

  mapCollectionConfig(props) {
    const collection = props.collectionData && !props.collectionData.loading
      ? props.collectionData.collection || {}
      : {}

    return {
      name: collection.name || '',
      dateFrom: collection.dateFrom || new Date(),
      dateTo: collection.dateTo || new Date(),
      highlight: collection.highlight !== undefined
        ? collection.highlight
        : false,
      searchable: collection.searchable !== undefined
        ? collection.searchable
        : false,
    }
  }

  handleChangeConfig = ({ field, value }) => {
    this.setState(prevState => ({
      config: {
        ...prevState.config,
        [field]: value,
      },
    }))
  };

  handleChangeSearch = e => {
    const searchQuery = e.target.value
    const newState = { searchQuery, queryFrom: 0, queryTo: 9 }

    this.productsRefetch({
      ...this.props.products.variables,
      ...newState,
    })

    this.setState(newState)
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
    this.setState({ currentPage: page })
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
          ...this.state.config,
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

  handleCancel = () => {
    this.props.navigate({ to: '/admin/collections' })
  };

  handleSave = () => {
    this.save()
  };

  render() {
    return (
      <div className="pv8 ph3 near-black bg-near-white w-100 h-100">
        <div className="w-90 center">
          <div className="flex justify-between items-center bb b--light-gray pb6 mb6">
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
                save collection
              </Button>
            </div>
          </div>

          <div className="flex justify-between">
            <div className="w-25">
            {this.props.collectionData.loading
              ? null
              : <Config
                collection={this.state.config}
                onChange={this.handleChangeConfig}
              />}
            </div>
            <div className="w-75 ml5">
              <div className="mb5 ba b--blue br2">
                <Alert>
                  Products are added to the collection by groups of conditions.
                </Alert>
              </div>
              <div className="mb5">
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
                  currentPage={this.state.currentPage}
                  products={this.props.products}
                  onChangeSelection={this.handleChangeSelection}
                  onChangePage={this.handleChangePage}
                  onChangeSearch={this.handleChangeSearch}
                />
              </div>
              <div className="mb5">
                <NewGroup />
              </div>
              <div className="mb5">
                <DynamicGroup />
              </div>
              <div className="mb5">
                <CollapsedGroup />
              </div>
            </div>
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
  navigate: PropTypes.func.isRequired,
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
  graphql(collectionMutation, { name: 'saveCollection' }),
  withNavigate()
)(Collection)

CollectionContainer.defaultProps = {
  collectionFrom: 0,
  collectionTo: 9,
  searchQuery: '',
  queryFrom: 0,
  queryTo: 9,
}

export default CollectionContainer
